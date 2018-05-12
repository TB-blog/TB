import { Route } from 'vue-router';
import { Store } from 'vuex';
import { State } from '../store/index';
import ItemList from './ItemList';

const camelize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function createListView(type: string) {
  return {
    name: `${type}-view`,

    asyncData({ store, route }: { store: Store<State>, route: Route }) {
      switch (type) {
        case 'blog':
          return store.dispatch('FETCH_ISSUES_AND_USER', {
            page: route.params.page ? Number(route.params.page) : 1,
            size: 10,
          });
          store.dispatch('FETCH_USER');
          return;

        case 'repo':
          return store.dispatch('FETCH_REPOS_AND_USER');

        default:
          break;
      }
    },

    title: camelize(type),

    render(h: any) {
      return h(ItemList, { props: { type } });
    },
  };
}
