/* --------------------------------------------------------------
   Simple Service Worker that caches:
   • The app shell (HTML, CSS, JS, icons, manifest)
   • API responses for the most recent search keyword.
   -------------------------------------------------------------- */

const CACHE_NAME = 'stock-finder-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install – cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate – clean up old caches (if any)
self.addEventListener('activate', event => {
  const allowed = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (!allowed.includes(name)) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Fetch – serve from cache first, fall back to network
self.addEventListener('fetch', event => {
  // Only handle GET requests (ignore POST, etc.)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResp => {
      // Return cached response, otherwise fetch from network and put it in cache
      return cachedResp || fetch(event.request).then(networkResp => {
        // Clone because response streams can only be consumed once
        const respClone = networkResp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, respClone));
        return networkResp;
      }).catch(() => {
        // If both cache and network fail, show a simple fallback page (optional)
        return caches.match('/index.html');
      });
    })
  );
});
