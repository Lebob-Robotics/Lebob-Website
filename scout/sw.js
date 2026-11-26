// The scout app moved to Foundry and the previous app to /old-scout/. This worker replaces the old one on phones
// that installed /scout: it clears the old offline copy (lebob-scout-*; /old-scout uses lebob-old-scout-*), unregisters
// itself and reloads open pages, which then get the redirect from the network.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('lebob-scout-')).map(x => caches.delete(x))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({type: 'window'}))
    .then(cs => cs.forEach(c => c.navigate('/scout/')))));
