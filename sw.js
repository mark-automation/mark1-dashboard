const CACHE_NAME = 'mark1-dashboard-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Push notification handler (mock)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New notification from Mark1',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
  };
  
  event.waitUntil(
    self.registration.showNotification('Mark1 Control Center', options)
  );
});
