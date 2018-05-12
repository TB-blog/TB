import { State } from './index';

interface SetIssuesPayload { data: State['issues']; }
interface SetSingleIssuesPayload { data: State['singleIssue']; }
interface SetIssuesAndUserPayload { data: any; }
interface SetReposAndUserPayload { data: any; }

export default {
  SET_REPOS_AND_USER: (state: State, { data }: SetReposAndUserPayload) => {
    state.repos = data[0].sort((a: any, b: any) => (b as any).stargazers_count - (a as any).stargazers_count);
    state.user = data[1];
  },

  SET_ISSUES_AND_USER: (state: State, { data }: SetIssuesAndUserPayload) => {
    state.issues = (data[0] as any).content;
    state.maxPage = (data[0] as any).maxPage;
    state.user = data[1];
  },

  SET_ISSUES: (state: State, { data }: SetIssuesPayload) => {
    state.issues = (data as any).content;
    state.maxPage = (data as any).maxPage;
  },

  SET_SINGLEISSUE: (state: State, { data }: SetSingleIssuesPayload) => {
    state.singleIssue = data;
  },
};
