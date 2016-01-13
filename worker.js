'use strict';


const CACHE_NAME = 'github-repositories-v1';


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request)
                .then((response) => {
                    // If we have a response in the cache, we return it.
                    if (response) {
                        return response;
                    }

                    // If not, we make a new network request.
                    return fetch(event.request.clone())
                        .then((response) => {
                            // Only cache requests to the GitHub API.
                            if (event.request.url.startsWith('https://api.github.com')) {
                                cache.put(event.request, response.clone());
                            }

                            return response;
                        });
                })
                .catch((error) => {
                    console.log('error handling fetch event: ', error);
                });
        })
    );
});
