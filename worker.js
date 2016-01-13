'use strict';


self.addEventListener('fetch', (event) => {
    if (event.request.url.startsWith('https://api.github.com')) {
        caches.match(event.request)
            .catch(() => {
                return fetch(event.request)
                    .then((response) => {
                        return caches.open('github-user-repositories')
                            .then((cache) => {
                                cache.put(event.request, response.clone());
                                event.respondWith(response);
                            });
                    })
            });
    } else {
        return fetch(event.request);
    }
});
