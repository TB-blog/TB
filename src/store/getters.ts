import { Getter, GetterTree } from 'vuex';
import { State } from './index';

export default {
  issues(state: State) {
    return state.issues;
  },

  repos(state: State) {
    return state.repos;
  },

  user(state: State) {
    return state.user;
  },
} as GetterTree<State, any>;
