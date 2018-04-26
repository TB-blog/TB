import {
  fetchUser,
  fetchIssues,
  fetchSingleIssue,
  fetchRepos
} from '../api';

export default {
  FETCH_USER: ({ commit, state }) => {
    return fetchUser().then(data => commit('SET_USER', { data }));
  },

  FETCH_ISSUES: ({ commit, state }, { page, size }) => {
    return fetchIssues(page, size).then(data => commit('SET_ISSUES', { data }));
  },

  FETCH_SINGLEISSUE: ({ commit, state }, { number }) => {
    return fetchSingleIssue(number).then(data => commit('SET_SINGLEISSUE', { data }));
  },

  FETCH_REPOS: ({ commit, state }) => {
    return fetchRepos().then(data => commit('FETCH_REPOS', { data }));
  }
};
