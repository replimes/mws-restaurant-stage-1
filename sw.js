const expectedCaches = ['rest-static-v1'];

// Caching and serving assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('rest-static-v1').then(function(cache) {
      console.log('Opened cache');
      return cache.addAll([
        '/',
        'sw.js',
        'index.html',
        'restaurant.html',
        'css/styles.css',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js'
      ]);
    })
  );
});
self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log('V1 now ready to handle fetches!');
    })
  );
});
// Respond with an entry from the cache if there is one.
// If there isn't, fetch from the network.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    }));
});
//404 Page
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if (response.status === 404) {
        return new Response("Uh oh, 404!");
      }
      return response;
    }).catch(function() {
      return new Response("Uh oh, that totally failed!");
    }));
});
