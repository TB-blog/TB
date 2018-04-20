import Vue from 'vue'

export default {
  SET_USER: (state, { data }) => {
    state.user = data
  },

  SET_ISSUES: (state, { data }) => {
    state.issues = data.content
    state.maxPage = data.maxPage
  },

  SET_SINGLEISSUE: (state, { data }) => {
    state.singleIssue = data
  },

  FETCH_REPOS: (state, { data }) => {
    state.repos = data.sort((a, b) => b.stargazers_count - a.stargazers_count)
  },
}
