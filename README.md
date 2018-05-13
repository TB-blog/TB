<div align="center">
  <a href="#">
    <img width="80" src="./public/logo-512.png" alt="LOGO">
  </a>
</div>
<br>
<div align="center">
  <a href="https://vuejs.org">
    <img src="http://forthebadge.com/images/badges/made-with-vue.svg">
  </a>
  <a href="https://t66y.com">
    <img src="http://forthebadge.com/images/badges/ages-18.svg">
  </a>
  <a href="http://ojiq40lzd.bkt.clouddn.com/love-qr.png">
    <img src="http://forthebadge.com/images/badges/built-with-love.svg">
  </a>
</div>

# TB

A simple & cool blog platform, based on `GitHub API`, designed for Geeks.

## Prerequisites

* Operating System: Linux, OS X or Windows.
* Node.js Runtime: 8.x or newer; it is recommended that you use [LTS Releases](https://nodejs.org).

## Language

[中文](README.zh-CN.md)

## Links

* [Home](https://github.com/TB-blog/TB)
* [Example](https://blog.trevor.top)
* [TB-CLI](https://github.com/TB-blog/TB-CLI)

![example-q](http://ojiq40lzd.bkt.clouddn.com/example-qr.png)


## Install & Usage

### Install

```shell
npm install tb-cli -g
```

### Usage

Highly recommend that please use [TB-CLI](https://github.com/TB-blog/TB-CLI)(All usage informations are in there).

## Start

Make sure you have installed [TB-CLI](https://github.com/TB-blog/TB-CLI). More details please click [here](https://github.com/TB-blog/TB-CLI).

```shell
tb init [project-name]
cd [project-name]
npm install // if using yarn: yarn
npm run dev
```
After generating TB, open your browser and visit http://127.0.0.1:2333.

## Development

```shell
git clone git@github.com:TB-blog/TB.git
cd TB
npm install // if using yarn: yarn
```
**Attention:** *You need to add a config file. If you are not a developer, please use [TB-CLI](https://github.com/TB-blog/TB-CLI) to get start.*

If you are a developer, you need to create a new file name `config.json` undered the project's root folder.

```javascript
{
  "token": "***", // your personal access token
  "nickname": "nickname", // your nickname
  "user": "TB", // your Github username
  "repo": "TB", // your repo name
  "gitalk": {
    "useGitalk": true, // use comment module, more details please see https://github.com/gitalk/gitalk
    "clientID": "***",
    "clientSecret": "***",
    "repo": "TB-comments",
    "owner": "TB",
    "admin": ["TB"]
  }
}
```

Run `npm run dev` then open your browser and visit http://127.0.0.1:2333.

## Themes

you can run `tb theme` to check official themes(coming soon).

## Contributing

Welcome to contribute by creating issues or sending pull requests. See [Contributing Guide](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
