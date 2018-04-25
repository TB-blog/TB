import axios from 'axios'
import _config from '../../config.js'
import config from './config-server.js'

axios.defaults.timeout = 3000 // 响应时间
axios.defaults.headers['Content-Type'] = 'application/json' // 通信格式

function findMaxPage(curPage, linkStr) {
  const arr = linkStr.split('page=').filter(el => {
    return el.match(/&per_/)
  })

  if (curPage - Math.max(...arr.map(el => { return Number(el.replace(/&per_/, '')) })) === 1) {
    return curPage
  }

  return Math.max(...arr.map(el => { return Number(el.replace(/&per_/, '')) }))
}

export function fetchIssues(page, size) {
  const key = 'issues'

  return new Promise((resolve,reject) => {
    if (config.cached && config.cached.has(key)) {
      resolve(config.cached.get(key))
    }

    return axios({
      method: 'get',
      url: config.api.issues,
      params: {
        access_token: _config.token,
        sort: 'created',
        page: Number(page),
        per_page: Number(size)
      }
    }).then(data => {
      const rows = {
        content: data.data,
        maxPage: findMaxPage(page, data.headers.link)
      }
      if (config.cached) {
        config.cached.set(key, rows)
      }
      resolve(rows)
    }).catch(data => {
      console.log(data)
      reject(data)
    })
  })
}

export function fetchUser() {
  const key = 'user'
  return new Promise((resolve,reject) => {
    if (config.cached && config.cached.has(key)) {
      resolve(config.cached.get(key))
    }

    return axios({
      method: 'get',
      url: config.api.user,
      params: {
        access_token: _config.token,
      }
    }).then(data => {
      if (config.cached) {
        config.cached.set(key, data.data)
      }
      resolve(data.data)
    }).catch(data => {
      reject(data)
    })
  })
}

export function fetchRepos() {
  const key = 'repos'
  return new Promise((resolve,reject) => {
    if (config.cached && config.cached.has(key)) {
      resolve(config.cached.get(key))
    }

    return axios({
      method: 'get',
      url: config.api.repos,
      params: {
        access_token: _config.token,
        sort: 'created',
        direction: 'desc'
      }
    }).then(data => {
      if (config.cached) {
        config.cached.set(key, data.data)
      }
      resolve(data.data)
    }).catch(data => {
      reject(data)
    })
  })
}

export function fetchSingleIssue(number) {
  const key = 'singleissue'
  return new Promise((resolve,reject) => {
    if (config.cached && config.cached.has(key)) {
      resolve(config.cached.get(key))
    }

    return axios({
      method: 'get',
      url: config.api.singleIssue + number,
      params: {
        access_token: _config.token
      }
    }).then(data => {
      if (config.cached) {
        config.cached.set(key, data.data)
      }
      resolve(data.data)
    }).catch(data => {
      reject(data)
    })
  })
}
