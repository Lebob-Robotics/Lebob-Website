// The Profile app became the main app at /scout/. This worker replaces the old one on installed phones:
// it clears the Profile app's offline copy, unregisters itself and sends open pages to /scout/.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('lebob-scout-profile-')).map(x => caches.delete(x))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({type: 'window'}))
    .then(cs => cs.forEach(c => c.navigate('/scout/')))));
