import Vue from 'vue';
import 'es6-promise/auto';
import { createApp } from './app';
import ProgressBar from './components/ProgressBar.vue';

const bar: any = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el);

Vue.mixin({
  beforeRouteUpdate (to: any, from: any, next: any) {
    const { asyncData } = (this as any).$options;
    if (asyncData) {
      asyncData({
        store: (this as any).$store,
        route: to
      }).then(next).catch(next);
    } else {
      next();
    }
  }
});

const { app, router, store }: any = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve((to: any, from: any, next: any) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c: any, i: any) => {
      return diffed || (diffed = (prevMatched[i] !== c));
    });
    const asyncDataHooks = activated.map((c: any) => c.asyncData).filter((_: any) => _);
    if (!asyncDataHooks.length) {
      return next();
    }

    bar.start();
    Promise.all(asyncDataHooks.map((hook: any) => hook({ store, route: to })))
      .then(() => {
        bar.finish();
        next();
      })
      .catch(next);
  });

  app.$mount('#app');
});

/* eslint-disable */
if (location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
