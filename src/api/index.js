import axios from 'axios'

axios.defaults.timeout = 3000 // 响应时间
axios.defaults.headers['Content-Type'] = 'application/json' // 通信格式
// axios.defaults.baseURL = '' // 生产环境接口地址

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
  return new Promise((resolve,reject) => {
    return axios({
      method: 'get',
      url: 'https://api.github.com/repos/HuangXiZhou/blog/issues',
      params: {
        access_token: '21e7a0eec119e72de965214bb101538dfeca3fcd',
        sort: 'created',
        page: Number(page),
        per_page: Number(size)
      }
    }).then(data => {
      const rows = {
        content: data.data,
        maxPage: findMaxPage(page, data.headers.link)
      }
      resolve(rows)
    }).catch(data => {
      console.log(data)
      reject(data)
    })
  })
}

export function fetchUser() {
  return new Promise((resolve,reject) => {
    return axios({
      method: 'get',
      url: 'https://api.github.com/users/HuangXiZhou',
      params: {
        access_token: '21e7a0eec119e72de965214bb101538dfeca3fcd',
      }
    }).then(data => {
      resolve(data.data)
    }).catch(data => {
      reject(data)
    })
  })
}

export function fetchRepos() {
  return new Promise((resolve,reject) => {
    return axios({
      method: 'get',
      url: 'https://api.github.com/users/HuangXiZhou/repos',
      params: {
        access_token: '21e7a0eec119e72de965214bb101538dfeca3fcd',
        sort: 'created',
        direction: 'desc'
      }
    }).then(data => {
      resolve(data.data)
    }).catch(data => {
      reject(data)
    })
  })
}

export function fetchSingleIssue(number) {
  return new Promise((resolve,reject) => {
    return axios({
      method: 'get',
      url: `https://api.github.com/repos/HuangXiZhou/blog/issues/${number}`,
      params: {
        access_token: '21e7a0eec119e72de965214bb101538dfeca3fcd'
      }
    }).then(data => {
      resolve(data.data)
    }).catch(data => {
      reject(data)
    })
  })
}
