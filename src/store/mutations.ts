import { State } from './index';

interface SetUserPayload { data: State['user'] };
interface SetIssuesPayload { data: State['issues']; };
interface SetSingleIssuesPayload { data: State['singleIssue'] };
interface SetReposPayload { data: State['repos'] };

export default {
  SET_USER: (state: State, { data }: SetUserPayload) => {
    state.user = data;
  },

  SET_ISSUES: (state: State, { data }: SetIssuesPayload) => {
    state.issues = (data as any).content;
    state.maxPage = (data as any).maxPage;
  },

  SET_SINGLEISSUE: (state: State, { data }: SetSingleIssuesPayload) => {
    state.singleIssue = data;
  },

  FETCH_REPOS: (state: State, { data }: SetReposPayload) => {
    state.repos = data.sort((a, b) => (b as any).stargazers_count - (a as any).stargazers_count);
  }
};
