import { State } from './index';

interface SetIssuesPayload { data: State['issues']; }
interface SetCommentsPayload { data: State['comments']; }
interface SetIssuesAndUserPayload { data: any; }
interface SetReposAndUserPayload { data: any; }
interface SetSingleIssueAndUserPayload { data: any; }

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

  SET_SINGLEISSUE_AND_USER: (state: State, { data }: SetSingleIssueAndUserPayload) => {
    state.singleIssue = data[0];
    state.user = data[1];
  },

  SET_COMMENTS: (state: State, { data }: SetCommentsPayload) => {
    state.comments = data.sort((a: any, b: any) => (b as any).id - (a as any).id);
  },
};
