import {
  fetchIssues,
  fetchRepos,
  fetchSingleIssue,
  fetchUser,
} from '../api';

import { ActionContext, ActionTree, Commit, Dispatch } from 'vuex';
import { State } from './index';

export default {
  FETCH_USER: ({ commit, state }: any) => {
    return fetchUser().then((data: any) => commit('SET_USER', { data }));
  },

  FETCH_ISSUES: ({ commit, state }: any, { page, size }: any) => {
    return fetchIssues(page, size).then((data: any) => commit('SET_ISSUES', { data }));
  },

  FETCH_SINGLEISSUE: ({ commit, state }: any, { issueNumber }: any) => {
    return fetchSingleIssue(issueNumber).then((data: any) => commit('SET_SINGLEISSUE', { data }));
  },

  FETCH_REPOS: ({ commit, state }: any) => {
    return fetchRepos().then((data: any) => commit('FETCH_REPOS', { data }));
  },
} as ActionTree<State, any>;
