import { Route } from 'vue-router';
import { Store } from 'vuex';
import { State } from '../store/index';
import ItemView from './ItemView';

const camelize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function createItemView(type: string) {
  return {
    name: `${type}-view`,

    asyncData ({ store, route }: { store: Store<State>, route: Route }) {
      return store.dispatch('FETCH_SINGLEISSUE', { issueNumber: [route.params.id] });
    },

    title: camelize('article'),

    render (h: any) {
      return h(ItemView);
    },
  };
}
