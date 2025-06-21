// Enhanced caching utilities optimized for mobile devices

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  size: number;
  priority: 'low' | 'medium' | 'high';
  accessCount: number;
  lastAccessed: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  priority?: 'low' | 'medium' | 'high';
  maxSize?: number; // Maximum cache size in bytes
  compress?: boolean;
}

interface CacheStats {
  size: number;
  itemCount: number;
  hitRate: number;
  totalHits: number;
  totalMisses: number;
  memoryUsage: number;
}

class MobileCache {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize: number;
  private currentSize = 0;
  private hits = 0;
  private misses = 0;
  private compressionEnabled: boolean;

  constructor(maxSize = 50 * 1024 * 1024, compressionEnabled = true) { // 50MB default
    this.maxSize = maxSize;
    this.compressionEnabled = compressionEnabled && 'CompressionStream' in window;
    
    // Clean up expired items periodically
    setInterval(() => this.cleanup(), 5 * 60 * 1000); // Every 5 minutes
    
    // Listen for memory pressure events
    if ('memory' in performance) {
      this.monitorMemoryPressure();
    }
  }

  async set<T>(key: string, data: T, options: CacheOptions = {}): Promise<void> {
    const {
      ttl = 30 * 60 * 1000, // 30 minutes default
      priority = 'medium',
      compress = this.compressionEnabled
    } = options;

    try {
      let processedData = data;
      let size = this.estimateSize(data);

      // Compress data if enabled and beneficial
      if (compress && size > 1024) { // Only compress if > 1KB
        try {
          processedData = await this.compressData(data);
          size = this.estimateSize(processedData);
        } catch (error) {
          console.warn('Compression failed, storing uncompressed:', error);
        }
      }

      const item: CacheItem<T> = {
        data: processedData,
        timestamp: Date.now(),
        expiresAt: Date.now() + ttl,
        size,
        priority,
        accessCount: 0,
        lastAccessed: Date.now()
      };

      // Remove existing item if it exists
      if (this.cache.has(key)) {
        const existingItem = this.cache.get(key)!;
        this.currentSize -= existingItem.size;
      }

      // Ensure we have space
      await this.ensureSpace(size);

      this.cache.set(key, item);
      this.currentSize += size;
    } catch (error) {
      console.error('Failed to cache item:', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);

    if (!item) {
      this.misses++;
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.delete(key);
      this.misses++;
      return null;
    }

    // Update access statistics
    item.accessCount++;
    item.lastAccessed = Date.now();
    this.hits++;

    try {
      // Decompress if needed
      if (this.isCompressed(item.data)) {
        return await this.decompressData(item.data);
      }
      return item.data;
    } catch (error) {
      console.error('Failed to retrieve cached item:', error);
      this.delete(key);
      return null;
    }
  }

  delete(key: string): boolean {
    const item = this.cache.get(key);
    if (item) {
      this.currentSize -= item.size;
      return this.cache.delete(key);
    }
    return false;
  }

  clear(): void {
    this.cache.clear();
    this.currentSize = 0;
    this.hits = 0;
    this.misses = 0;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    return item ? Date.now() <= item.expiresAt : false;
  }

  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      size: this.currentSize,
      itemCount: this.cache.size,
      hitRate: total > 0 ? this.hits / total : 0,
      totalHits: this.hits,
      totalMisses: this.misses,
      memoryUsage: this.getMemoryUsage()
    };
  }

  // Preload critical data
  async preload(items: Array<{ key: string; fetcher: () => Promise<any>; options?: CacheOptions }>): Promise<void> {
    const promises = items.map(async ({ key, fetcher, options }) => {
      if (!this.has(key)) {
        try {
          const data = await fetcher();
          await this.set(key, data, { ...options, priority: 'high' });
        } catch (error) {
          console.warn(`Failed to preload ${key}:`, error);
        }
      }
    });

    await Promise.allSettled(promises);
  }

  // Adaptive caching based on network conditions
  async adaptiveSet<T>(key: string, data: T, options: CacheOptions = {}): Promise<void> {
    const networkInfo = this.getNetworkInfo();
    
    // Adjust TTL based on network conditions
    let adjustedTTL = options.ttl || 30 * 60 * 1000;
    
    if (networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g') {
      adjustedTTL *= 2; // Cache longer on slow networks
    } else if (networkInfo.effectiveType === '4g') {
      adjustedTTL *= 0.5; // Cache shorter on fast networks
    }

    // Adjust compression based on device capabilities
    const deviceInfo = this.getDeviceInfo();
    const shouldCompress = options.compress !== false && 
      (deviceInfo.memory > 4 || networkInfo.saveData);

    await this.set(key, data, {
      ...options,
      ttl: adjustedTTL,
      compress: shouldCompress
    });
  }

  private async ensureSpace(requiredSize: number): Promise<void> {
    if (this.currentSize + requiredSize <= this.maxSize) {
      return;
    }

    // Sort items by priority and last access time
    const items = Array.from(this.cache.entries()).sort((a, b) => {
      const [, itemA] = a;
      const [, itemB] = b;
      
      // Priority order: low < medium < high
      const priorityOrder = { low: 0, medium: 1, high: 2 };
      const priorityDiff = priorityOrder[itemA.priority] - priorityOrder[itemB.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // If same priority, evict least recently used
      return itemA.lastAccessed - itemB.lastAccessed;
    });

    // Remove items until we have enough space
    for (const [key, item] of items) {
      if (this.currentSize + requiredSize <= this.maxSize) {
        break;
      }
      
      this.cache.delete(key);
      this.currentSize -= item.size;
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      this.delete(key);
    }
  }

  private estimateSize(data: any): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      return JSON.stringify(data).length * 2; // Rough estimate
    }
  }

  private async compressData(data: any): Promise<any> {
    if (!this.compressionEnabled) return data;

    try {
      const jsonString = JSON.stringify(data);
      const stream = new CompressionStream('gzip');
      const writer = stream.writable.getWriter();
      const reader = stream.readable.getReader();

      writer.write(new TextEncoder().encode(jsonString));
      writer.close();

      const chunks: Uint8Array[] = [];
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) chunks.push(value);
      }

      const compressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        compressed.set(chunk, offset);
        offset += chunk.length;
      }

      return { __compressed: true, data: Array.from(compressed) };
    } catch (error) {
      throw new Error(`Compression failed: ${error}`);
    }
  }

  private async decompressData(compressedData: any): Promise<any> {
    if (!this.isCompressed(compressedData)) return compressedData;

    try {
      const compressed = new Uint8Array(compressedData.data);
      const stream = new DecompressionStream('gzip');
      const writer = stream.writable.getWriter();
      const reader = stream.readable.getReader();

      writer.write(compressed);
      writer.close();

      const chunks: Uint8Array[] = [];
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) chunks.push(value);
      }

      const decompressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        decompressed.set(chunk, offset);
        offset += chunk.length;
      }

      const jsonString = new TextDecoder().decode(decompressed);
      return JSON.parse(jsonString);
    } catch (error) {
      throw new Error(`Decompression failed: ${error}`);
    }
  }

  private isCompressed(data: any): boolean {
    return data && typeof data === 'object' && data.__compressed === true;
  }

  private getNetworkInfo() {
    const connection = (navigator as any).connection;
    return {
      effectiveType: connection?.effectiveType || '4g',
      downlink: connection?.downlink || 10,
      saveData: connection?.saveData || false
    };
  }

  private getDeviceInfo() {
    return {
      memory: (navigator as any).deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4
    };
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize || 0;
    }
    return 0;
  }

  private monitorMemoryPressure(): void {
    const checkMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        
        // If memory usage is high, aggressively clean cache
        if (usageRatio > 0.8) {
          this.maxSize = Math.max(this.maxSize * 0.5, 10 * 1024 * 1024); // Reduce to 50% or 10MB minimum
          this.cleanup();
        }
      }
    };

    setInterval(checkMemory, 30000); // Check every 30 seconds
  }
}

// Global cache instance
export const mobileCache = new MobileCache();

// Utility functions
export const cacheWithFallback = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: CacheOptions
): Promise<T> => {
  // Try to get from cache first
  const cached = await mobileCache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch and cache
  try {
    const data = await fetcher();
    await mobileCache.adaptiveSet(key, data, options);
    return data;
  } catch (error) {
    // If fetch fails, try to return stale data
    const staleData = await mobileCache.get<T>(`${key}_stale`);
    if (staleData !== null) {
      return staleData;
    }
    throw error;
  }
};

export const preloadCriticalData = async (items: Array<{
  key: string;
  fetcher: () => Promise<any>;
  options?: CacheOptions;
}>): Promise<void> => {
  await mobileCache.preload(items);
};

export default MobileCache;
