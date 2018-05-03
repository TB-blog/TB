import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import { Store } from 'vuex';

Vue.use(Vuex);

export function createStore (): Store<State> {
  return new Vuex.Store({
    state: {
      issues: [],
      repos: [],
      singleIssue: [],
      maxPage: 0,
      user: {}
    },
    actions,
    mutations,
    getters
  });
}

export interface State {
  issues: Array<object>;
  repos: Array<object>;
  singleIssue: object;
  maxPage: number;
  user: object;
  route?: any;
};
