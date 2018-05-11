import axios from 'axios';
import * as md5 from 'md5';
import * as _config from '../../config.json';
import api from './config-api-server';

axios.defaults.timeout = 3000;
axios.defaults.headers['Content-Type'] = 'application/json';

const baseUrl = 'https://api.github.com';

function findMaxPage(curPage: number, linkStr: string) {
  const arr = linkStr.split('page=').filter(el => {
    return el.match(/&per_/);
  });
  if (curPage - Math.max(...arr.map(el => Number(el.replace(/&per_/, '')))) === 1) {
    return curPage;
  }
  return Math.max(...arr.map(el => Number(el.replace(/&per_/, ''))));
}

function warmCache() {
  fetchIssues(1, 10);
  fetchRepos();
  fetchUser();
  setTimeout(warmCache, 1000 * 60 * 15);
}

if ((api as any).onServer) {
  warmCache();
}

export function fetchIssues(page: number, size: number) {
  const key = md5(`issues-${page}`);

  return new Promise((resolve, reject) => {
    if ((api as any).cached && (api as any).cached.has(key)) {
      resolve((api as any).cached.get(key));
    }

    return axios({
      method: 'get',
      url: `${baseUrl}/repos/${(_config as any).user}/${(_config as any).repo}/issues`,
      params: {
        access_token: (_config as any).token,
        sort: 'created',
        state: 'open',
        page,
        per_page: size,
      },
    }).then(data => {
      const rows = {
        content: data.data,
        maxPage: data.data.length && data.headers.link
                  ? findMaxPage(page, data.headers.link)
                  : 1,
      };
      if ((api as any).cached) {
        (api as any).cached.set(key, rows);
      }
      resolve(rows);
    }).catch(data => {
      console.log(data);
      reject(data);
    });
  });
}

export function fetchUser() {
  const key = 'user';
  return new Promise((resolve, reject) => {
    if ((api as any).cached && (api as any).cached.has(key)) {
      resolve((api as any).cached.get(key));
    }

    return axios({
      method: 'get',
      url: `${baseUrl}/users/${(_config as any).user}`,
      params: {
        access_token: (_config as any).token,
      },
    }).then(data => {
      if ((api as any).cached) {
        (api as any).cached.set(key, data.data);
      }
      resolve(data.data);
    }).catch(data => {
      reject(data);
    });
  });
}

export function fetchRepos() {
  const key = 'repos';
  return new Promise((resolve, reject) => {
    if ((api as any).cached && (api as any).cached.has(key)) {
      resolve((api as any).cached.get(key));
    }

    return axios({
      method: 'get',
      url: `${baseUrl}/users/${(_config as any).user}/repos`,
      params: {
        access_token: (_config as any).token,
        sort: 'created',
        direction: 'desc',
      },
    }).then(data => {
      if ((api as any).cached) {
        (api as any).cached.set(key, data.data);
      }
      resolve(data.data);
    }).catch(data => {
      reject(data);
    });
  });
}

export function fetchSingleIssue(issueNumber: number) {
  const key = md5(`singleissue-${issueNumber}`);
  return new Promise((resolve, reject) => {
    if ((api as any).cached && (api as any).cached.has(key)) {
      resolve((api as any).cached.get(key));
    }

    return axios({
      method: 'get',
      url: `${baseUrl}/repos/${(_config as any).user}/${(_config as any).repo}/issues/${issueNumber}`,
      params: {
        access_token: (_config as any).token,
      },
    }).then(data => {
      if ((api as any).cached) {
        (api as any).cached.set(key, data.data);
      }
      resolve(data.data);
    }).catch(data => {
      reject(data);
    });
  });
}
