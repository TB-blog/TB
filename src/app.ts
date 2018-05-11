import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';
import titleMixin from './util/title';
import * as filters from './util/filters';
const _config = require('../config.json');

Vue.mixin(titleMixin);

(Vue.prototype as any).$_config = _config;

Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as any)[key]);
});

export function createApp () {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: (h: any) => h(App)
  });

  return { app, router, store };
}
