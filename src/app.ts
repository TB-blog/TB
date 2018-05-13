import Vue from 'vue';
import '../theme/theme-geek-dark/source/style/App.styl';
import App from '../theme/theme-geek-dark/layout/src/App.template.vue';
import { createStore } from './store';
import { createRouter } from './router';
import { sync } from 'vuex-router-sync';
import titleMixin from './util/title';
import * as filters from './util/filters';
import _config from '../config.json';

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
