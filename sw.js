const cacheName = 'sekconv-cache-000'

const hourInMS = 3600000

let filesToCache = [
  '/',
  '/manifest.json',
  '/style/main.css',
  '/style/bootstrap.min.css',
  '/script/jquery-3.2.1.min.js',
  '/script/popper.min.js',
  '/script/bootstrap.min.js',
  '/script/money.min.js',
  '/script/main.js',
  '/image/favicon-16x16.png'
]

/* global self, caches, fetch */

self.addEventListener('install', event => {
  console.log('sw.js: installling service worker')
  console.log(`sw.js: Using cache ${cacheName}`)
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(filesToCache)
      })
  )
})

self.addEventListener('fetch', event => {
  console.log(`sw.js: fetch event for ${event.request.url}`)
  if (event.request.url === 'https://api.fixer.io/latest?base=USD&symbols=USD,SEK') {
    caches.match(event.request.url)
      .then(response => {
        if (response) {
          let body = JSON.parse(response)
          let today = Date.now()
          let resDate = body.date
          if ((today - hourInMS) < resDate) {
            console.log('sw.js: Using cached value')
            return response
          } else {
            return fetch(event.request)
              .then(response => {
                return caches.open(cacheName).then(cache => {
                  cache.put(event.request.url, response.clone())
                  return response
                })
              })
          }
        }
      })
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          console.log('sw.js: Using cached value')
          return response
        }
        console.log('sw.js: Using network')
        return fetch(event.request)
      })
    )
  }
})
