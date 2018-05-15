import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import { Store } from 'vuex';

Vue.use(Vuex);

export function createStore(): Store<State> {
  return new Vuex.Store({
    state: {
      issues: [],
      repos: [],
      singleIssue: [],
      comments: [],
      maxPage: 0,
      user: {},
    },
    actions,
    mutations,
    getters,
  });
}

export interface State {
  issues: object[];
  repos: object[];
  singleIssue: object;
  comments: object[];
  maxPage: number;
  user: object;
  route?: any;
}
