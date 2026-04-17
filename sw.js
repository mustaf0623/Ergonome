/* ═══════════════════════════════════════════
   Ergonome — Service Worker v7.2
   Compatible avec IndexedDB storage
   Network-first pour index.html, cache-first pour assets
═══════════════════════════════════════════ */
const CACHE = 'ergonome-v7.2.0';
const ASSETS = ['./index.html','./manifest.json','./icon-16.png','./icon-32.png','./icon-180.png','./icon-192.png','./icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;
  const url = new URL(e.request.url);
  // Network-first pour index.html (toujours la version la plus récente)
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request).then(r => {
        if (r && r.status === 200) {
          const clone = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return r;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Cache-first pour les autres assets
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(r => {
        if (r && r.status === 200) {
          const clone = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return r;
      }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : undefined);
    })
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
  if (e.data === 'CLEAR_CACHE') caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))));
});
