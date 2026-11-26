// /old-scout was removed. Phones that installed it keep running this worker's cached copy until it is replaced, so this
// one clears the lebob-old-scout-* caches, unregisters itself and sends open pages to /scout/ (the Foundry app).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('lebob-old-scout-')).map(x => caches.delete(x))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({type: 'window'}))
    .then(cs => cs.forEach(c => c.navigate('/scout/')))));
