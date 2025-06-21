// Service Worker Registration and Management
// Provides offline caching and performance optimization

interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onOfflineReady?: () => void;
  onError?: (error: Error) => void;
}

interface CacheStats {
  size: number;
  entries: number;
  hitRate: number;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private config: ServiceWorkerConfig = {};
  private isOnline = navigator.onLine;
  private cacheStats: CacheStats = { size: 0, entries: 0, hitRate: 0 };

  constructor(config: ServiceWorkerConfig = {}) {
    this.config = config;
    this.setupOnlineOfflineListeners();
  }

  // Register service worker
  async register(swUrl: string = '/sw.js'): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return false;
    }

    try {
      console.log('Registering Service Worker...');
      
      const registration = await navigator.serviceWorker.register(swUrl, {
        scope: '/'
      });

      this.registration = registration;

      // Handle different service worker states
      if (registration.installing) {
        console.log('Service Worker: Installing...');
        this.trackInstalling(registration.installing);
      } else if (registration.waiting) {
        console.log('Service Worker: Waiting...');
        this.config.onUpdate?.(registration);
      } else if (registration.active) {
        console.log('Service Worker: Active');
        this.config.onSuccess?.(registration);
      }

      // Listen for updates
      registration.addEventListener('updatefound', () => {
        console.log('Service Worker: Update found');
        const newWorker = registration.installing;
        if (newWorker) {
          this.trackInstalling(newWorker);
        }
      });

      // Check for updates periodically
      this.setupUpdateCheck();

      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      this.config.onError?.(error as Error);
      return false;
    }
  }

  // Track installing service worker
  private trackInstalling(worker: ServiceWorker) {
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          // New update available
          console.log('Service Worker: New content available');
          this.config.onUpdate?.(this.registration!);
        } else {
          // Content cached for offline use
          console.log('Service Worker: Content cached for offline use');
          this.config.onOfflineReady?.();
        }
      }
    });
  }

  // Setup periodic update checks
  private setupUpdateCheck() {
    // Check for updates every 30 minutes
    setInterval(() => {
      if (this.registration) {
        this.registration.update().catch(console.error);
      }
    }, 30 * 60 * 1000);
  }

  // Setup online/offline listeners
  private setupOnlineOfflineListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('Service Worker: Back online');
      this.syncWhenOnline();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('Service Worker: Gone offline');
    });
  }

  // Sync data when coming back online
  private async syncWhenOnline() {
    if (this.registration && this.registration.sync) {
      try {
        await this.registration.sync.register('background-sync');
        console.log('Service Worker: Background sync registered');
      } catch (error) {
        console.error('Service Worker: Background sync failed:', error);
      }
    }
  }

  // Skip waiting and activate new service worker
  async skipWaiting(): Promise<void> {
    if (this.registration && this.registration.waiting) {
      // Send message to service worker to skip waiting
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Wait for the new service worker to take control
      return new Promise((resolve) => {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          resolve();
        });
      });
    }
  }

  // Clear all caches
  async clearCache(): Promise<boolean> {
    try {
      if (this.registration && this.registration.active) {
        return new Promise((resolve, reject) => {
          const messageChannel = new MessageChannel();
          
          messageChannel.port1.onmessage = (event) => {
            if (event.data.success) {
              console.log('Service Worker: Cache cleared successfully');
              resolve(true);
            } else {
              console.error('Service Worker: Cache clear failed:', event.data.error);
              reject(new Error(event.data.error));
            }
          };

          this.registration!.active!.postMessage(
            { type: 'CLEAR_CACHE' },
            [messageChannel.port2]
          );
        });
      }

      // Fallback: clear caches directly
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('Cache cleared directly');
      return true;
    } catch (error) {
      console.error('Failed to clear cache:', error);
      return false;
    }
  }

  // Get cache statistics
  async getCacheStats(): Promise<CacheStats> {
    try {
      if (this.registration && this.registration.active) {
        return new Promise((resolve) => {
          const messageChannel = new MessageChannel();
          
          messageChannel.port1.onmessage = (event) => {
            this.cacheStats = {
              size: event.data.size,
              entries: event.data.entries || 0,
              hitRate: event.data.hitRate || 0
            };
            resolve(this.cacheStats);
          };

          this.registration!.active!.postMessage(
            { type: 'GET_CACHE_SIZE' },
            [messageChannel.port2]
          );
        });
      }

      // Fallback: calculate cache size directly
      const cacheNames = await caches.keys();
      let totalSize = 0;
      let totalEntries = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        totalEntries += requests.length;

        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      this.cacheStats = {
        size: totalSize,
        entries: totalEntries,
        hitRate: 0 // Cannot calculate without service worker
      };

      return this.cacheStats;
    } catch (error) {
      console.error('Failed to get cache stats:', error);
      return { size: 0, entries: 0, hitRate: 0 };
    }
  }

  // Check if app is running offline
  isOffline(): boolean {
    return !this.isOnline;
  }

  // Get registration status
  getRegistration(): ServiceWorkerRegistration | null {
    return this.registration;
  }

  // Unregister service worker
  async unregister(): Promise<boolean> {
    if (this.registration) {
      try {
        const result = await this.registration.unregister();
        console.log('Service Worker unregistered:', result);
        return result;
      } catch (error) {
        console.error('Service Worker unregistration failed:', error);
        return false;
      }
    }
    return false;
  }
}

// Default service worker manager instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Register service worker with default configuration
export async function registerSW(config: ServiceWorkerConfig = {}): Promise<boolean> {
  const manager = new ServiceWorkerManager(config);
  return await manager.register();
}

// Unregister service worker
export async function unregisterSW(): Promise<boolean> {
  return await serviceWorkerManager.unregister();
}

// Clear all caches
export async function clearSWCache(): Promise<boolean> {
  return await serviceWorkerManager.clearCache();
}

// Get cache statistics
export async function getSWCacheStats(): Promise<CacheStats> {
  return await serviceWorkerManager.getCacheStats();
}

// Check if offline
export function isOffline(): boolean {
  return serviceWorkerManager.isOffline();
}

// Skip waiting for new service worker
export async function skipWaiting(): Promise<void> {
  return await serviceWorkerManager.skipWaiting();
}

// Hook for React components
export function useServiceWorker(config: ServiceWorkerConfig = {}) {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);
  const [cacheStats, setCacheStats] = React.useState<CacheStats>({ size: 0, entries: 0, hitRate: 0 });

  React.useEffect(() => {
    const manager = new ServiceWorkerManager({
      ...config,
      onSuccess: (registration) => {
        setIsRegistered(true);
        config.onSuccess?.(registration);
      },
      onError: (error) => {
        setIsRegistered(false);
        config.onError?.(error);
      }
    });

    manager.register();

    // Update cache stats periodically
    const updateStats = async () => {
      const stats = await manager.getCacheStats();
      setCacheStats(stats);
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // Every 30 seconds

    // Listen for online/offline changes
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isRegistered,
    isOffline,
    cacheStats,
    clearCache: () => serviceWorkerManager.clearCache(),
    skipWaiting: () => serviceWorkerManager.skipWaiting()
  };
}

export default ServiceWorkerManager;
