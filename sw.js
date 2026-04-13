/* ═══════════════════════════════════════════════
   Ergonome — Service Worker v7.0
   Compatible avec IndexedDB (v7)
   Cache-first pour les assets statiques
   Network-first pour index.html (mise à jour)
═══════════════════════════════════════════════ */

const CACHE_NAME = 'ergonome-v7';

/* Assets à mettre en cache au démarrage */
const STATIC_ASSETS = [
  './index.html',
  './manifest.json',
  './icon-16.png',
  './icon-32.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png'
];

/* ── INSTALL : pré-cache les assets statiques ── */
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        // Fail silently sur les assets individuels manquants
        console.warn('[SW] Certains assets non cachés:', err);
      });
    })
  );
});

/* ── ACTIVATE : supprime les anciens caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Suppression ancien cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH : stratégie selon le type de ressource ── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  /* index.html → Network-first (toujours la version la plus récente) */
  if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  /* Autres assets → Cache-first (icônes, manifest) */
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        /* Fallback offline : retourner index.html pour les navigations */
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

/* ── MESSAGE : commandes depuis l'application ── */
self.addEventListener('message', event => {
  if (!event.data) return;

  /* Commande de nettoyage total (depuis delAll() dans l'app) */
  if (event.data === 'CLEAR_ALL_CACHES') {
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => {
      console.log('[SW] Tous les caches supprimés');
    });
  }

  /* Forcer la mise à jour du service worker */
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
