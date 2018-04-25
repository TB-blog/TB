const LRU = require('lru-cache')

let api
if (process.__API__) {
    api = process.__API__
} else {
    api = process.__API__ = {
        api: {
          issues: 'https://api.github.com/repos/HuangXiZhou/blog/issues',
          user: 'https://api.github.com/users/HuangXiZhou',
          repos: 'https://api.github.com/users/HuangXiZhou/repos',
          singleIssue: 'https://api.github.com/repos/HuangXiZhou/blog/issues/'
        },
        cached: LRU({
          max: 1000,
          maxAge: 1000 * 60 * 15
        }),
        cachedItem: {}
    }
}

module.exports = api
