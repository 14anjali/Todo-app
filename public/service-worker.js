// Name of the cache
const CACHE_NAME = "todo-cache-v1";

// Files to cache for offline usage
const urlsToCache = [
  "/",                // root
  "/index.html",      // main HTML
  "/src/main.jsx"   // entry JS 

];

// Install service worker and cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Activate immediately
});

// Activate service worker and remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME) // remove old caches
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // Take control immediately
});

// Fetch files: try cache first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
