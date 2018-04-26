import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';
import titleMixin from './util/title';
import * as filters from './util/filters';
import _config from '../config.js';

Vue.mixin(titleMixin);

Vue.prototype.$_config = _config;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

export function createApp () {
  const store = createStore();
  const router = createRouter();

  sync(store, router);

  const app = new Vue({
    _config,
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
}
