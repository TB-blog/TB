import { Getter, GetterTree } from 'vuex';
import { State } from './index';

export default {
  issues(state: State) {
    return state.issues;
  },

  repos(state: State) {
    return state.repos;
  },
} as GetterTree<State, any>;
