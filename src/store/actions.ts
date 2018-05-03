import {
  fetchUser,
  fetchIssues,
  fetchSingleIssue,
  fetchRepos
} from '../api';

import { State } from './index';
import { ActionTree, ActionContext, Dispatch, Commit } from "vuex";

export default <ActionTree<State, any>>{
  FETCH_USER: ({ commit, state }: any) => {
    return fetchUser().then((data: any) => commit('SET_USER', { data }));
  },

  FETCH_ISSUES: ({ commit, state }: any, { page, size }: any) => {
    return fetchIssues(page, size).then((data: any) => commit('SET_ISSUES', { data }));
  },

  FETCH_SINGLEISSUE: ({ commit, state }: any, { number }: any) => {
    return fetchSingleIssue(number).then((data: any) => commit('SET_SINGLEISSUE', { data }));
  },

  FETCH_REPOS: ({ commit, state }: any) => {
    return fetchRepos().then((data: any) => commit('FETCH_REPOS', { data }));
  }
};
