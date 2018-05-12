import {
  fetchIssues,
  fetchIssuesAndUser,
  fetchReposAndUser,
  fetchSingleIssue,
} from '../api';

import { ActionContext, ActionTree, Commit, Dispatch } from 'vuex';
import { State } from './index';

export default {
  FETCH_ISSUES_AND_USER: ({ commit, state }: any, { page, size }: { page: number, size: number }) => {
    return fetchIssuesAndUser(page, size).then((data: any) => commit('SET_ISSUES_AND_USER', { data }));
  },

  FETCH_REPOS_AND_USER: ({ commit, state }: any) => {
    return fetchReposAndUser().then((data: any) => commit('SET_REPOS_AND_USER', { data }));
  },

  FETCH_ISSUES: ({ commit, state }: any, { page, size }: { page: number, size: number }) => {
    return fetchIssues(page, size).then((data: any) => commit('SET_ISSUES', { data }));
  },

  FETCH_SINGLEISSUE: ({ commit, state }: any, { issueNumber }: { issueNumber: number }) => {
    return fetchSingleIssue(issueNumber).then((data: any) => commit('SET_SINGLEISSUE', { data }));
  },
} as ActionTree<State, any>;
