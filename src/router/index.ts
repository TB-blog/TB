import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';

Vue.use(Router);

const createListView = (id: string) => () => import('../views/CreateListView').then((m: any) => m.default(id));
const itemView = () => import('../views/itemView.vue');
const errorView = () => import('../views/errorView.vue');

export function createRouter(): Router {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      { path: '/blog/:page(\\d+)?', component: createListView('blog') },
      { path: '/repo', component: createListView('repo') },
      { path: '/item/:id(\\d+)', component: itemView },
      { path: '/error/:code', component: errorView },
      { path: '/', redirect: '/blog' },
    ],
  } as RouterOptions);
}
