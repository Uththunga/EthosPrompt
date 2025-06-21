// Service Worker for EthosPrompt
// Provides offline caching and performance optimization

const CACHE_NAME = 'ethosprompt-v1.0.0';
const STATIC_CACHE_NAME = 'ethosprompt-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'ethosprompt-dynamic-v1.0.0';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/EthosPrompt/',
  '/manifest.json',
  '/favicon.ico',
  // Add critical CSS and JS files here when available
];

// Dynamic content patterns to cache
const DYNAMIC_PATTERNS = [
  /\/categories\/.*/,
  /\/prompts\/.*/,
  /\/prompt-engineering-guide.*/,
  /\/resources.*/
];

// Assets to cache on first request
const CACHE_ON_REQUEST = [
  /\.js$/,
  /\.css$/,
  /\.woff2?$/,
  /\.png$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.svg$/,
  /\.webp$/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Main request handler with different caching strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Strategy 1: Cache First for static assets
    if (isStaticAsset(pathname)) {
      return await cacheFirst(request, STATIC_CACHE_NAME);
    }
    
    // Strategy 2: Stale While Revalidate for dynamic content
    if (isDynamicContent(pathname)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE_NAME);
    }
    
    // Strategy 3: Network First for API calls and fresh content
    return await networkFirst(request, DYNAMIC_CACHE_NAME);
    
  } catch (error) {
    console.error('Service Worker: Request failed:', error);
    
    // Fallback to cache if available
    const cachedResponse = await getCachedResponse(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page or error response
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Cache First strategy - for static assets
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Stale While Revalidate strategy - for dynamic content
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Fetch from network in background
  const networkPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached version if available
    return cachedResponse;
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Otherwise wait for network
  return await networkPromise;
}

// Network First strategy - for fresh content
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await getCachedResponse(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Helper function to get cached response from any cache
async function getCachedResponse(request) {
  const cacheNames = [STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME, CACHE_NAME];
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const response = await cache.match(request);
    if (response) {
      return response;
    }
  }
  
  return null;
}

// Helper functions to determine caching strategy
function isStaticAsset(pathname) {
  return CACHE_ON_REQUEST.some(pattern => pattern.test(pathname)) ||
         pathname.includes('/assets/') ||
         pathname.includes('/static/') ||
         pathname === '/' ||
         pathname === '/EthosPrompt/' ||
         pathname.endsWith('.js') ||
         pathname.endsWith('.css') ||
         pathname.endsWith('.woff2') ||
         pathname.endsWith('.woff') ||
         pathname.endsWith('.png') ||
         pathname.endsWith('.jpg') ||
         pathname.endsWith('.jpeg') ||
         pathname.endsWith('.svg') ||
         pathname.endsWith('.webp');
}

function isDynamicContent(pathname) {
  return DYNAMIC_PATTERNS.some(pattern => pattern.test(pathname));
}

// Message handling for cache management
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      }).catch((error) => {
        event.ports[0].postMessage({ success: false, error: error.message });
      });
      break;
      
    case 'GET_CACHE_SIZE':
      getCacheSize().then((size) => {
        event.ports[0].postMessage({ size });
      });
      break;
      
    default:
      console.log('Service Worker: Unknown message type:', type);
  }
});

// Cache management functions
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('Service Worker: All caches cleared');
}

async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
  // Track cache hit rates and performance metrics
  if (event.request.url.includes('/api/') || event.request.url.includes('/data/')) {
    const startTime = performance.now();
    
    event.respondWith(
      handleRequest(event.request).then((response) => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Log performance metrics (in production, send to analytics)
        console.log(`Service Worker: Request to ${event.request.url} took ${duration}ms`);
        
        return response;
      })
    );
  }
});

console.log('Service Worker: Loaded and ready');
