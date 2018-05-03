import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';

Vue.use(Router);

const createListView = (type: string) => () => import('../views/CreateListView').then((m: any) => m.default(type));
const ItemView = () => import('../views/ItemView.vue');
const ErrorView = () => import('../views/ErrorView.vue');

export function createRouter (): Router {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      { path: '/blog/:page(\\d+)?', component: createListView('blog') },
      { path: '/repo', component: createListView('repo') },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/error/:code', component: ErrorView },
      { path: '/', redirect: '/blog' }
    ]
  } as RouterOptions);
}
