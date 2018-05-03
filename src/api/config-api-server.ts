import * as LRU from 'lru-cache';

let api: any;

if ((process as any).__API__) {
  api = (process as any).__API__;
} else {
  api = (process as any).__API__ = {
    cached: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    onServer: true,
    cachedItem: {}
  };
}

export default api;
