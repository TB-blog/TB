const LRU = require('lru-cache')

let api

if (process.__API__) {
  api = process.__API__
} else {
  api = process.__API__ = {
    cached: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    onServer: true,
    cachedItem: {}
  }
}

module.exports = api
