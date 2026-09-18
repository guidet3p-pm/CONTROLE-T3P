// Service worker — T3P Contrôle
// Étape 1/fondation : met en cache la coquille de l'appli pour un fonctionnement
// hors ligne immédiat. Les écrans de contenu (guide, fiches, NATINF...) viendront
// enrichir APP_SHELL au fil des prochaines étapes.

const CACHE_VERSION = 'v6';
const CACHE_NAME = `t3p-shell-${CACHE_VERSION}`;

const GUIDE_PAGES = [
  'sommaire', 'avant-propos', 'objectifs', 'introduction',
  'chapitre-1-taxi', 'chapitre-2-vtc', 'chapitre-3-loti', 'chapitre-4-vmdtr-cpa',
  'annexe-a-natinf', 'annexe-b-sanctions', 'annexe-c-ressources',
  'annexe-d-fiches-reflexes', 'annexe-e-procedure', 'annexe-f-chronologie',
  'annexe-g-glossaire', 'annexe-h-contacts', 'annexe-i-index', 'annexe-k-maj'
];

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './outils/identification.html',
  './outils/controle.html',
  './outils/controle-view.html',
  './outils/favoris.html',
  './js/data-natinf.js',
  './js/data-professions.js',
  './js/favoris.js',
  './js/controle-engine.js',
  ...GUIDE_PAGES.map((p) => `./guide/${p}.html`)
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('t3p-shell-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Stratégie : réseau d'abord (contenu à jour dès que possible),
// repli sur le cache si hors ligne — essentiel en zone portuaire/tunnels
// où la 4G est instable.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request, { ignoreSearch: true }).then((cached) => cached || caches.match('./index.html'))
      )
  );
});
