import { GetterTree, Getter } from 'vuex';
import { State } from './index';

export default <GetterTree<State, any>>{
  issues (state: State) {
    return state.issues;
  },

  repos (state: State) {
    return state.repos;
  }
};
