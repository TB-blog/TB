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

专为极客设计的上手简单、酷炫，基于 `Github API` 的博客平台。

## 环境准备

* 操作系统：支持 macOS，Linux，Windows
* 运行环境：建议选择 [LTS 版本](https://nodejs.org/zh-cn/) Node.js，最低要求 8.x

## 语言

[English](README.md)

## 链接

* [源码](https://github.com/TB-blog/TB)
* [示例](https://blog.trevor.top)
* [TB-CLI](https://github.com/TB-blog/TB-CLI)

![example-q](http://ojiq40lzd.bkt.clouddn.com/example-qr.png)


## 安装 & 使用

### 安装

```shell
npm install tb-cli -g
```

### 使用

强烈推荐使用 [TB-CLI](https://github.com/TB-blog/TB-CLI)。

## 快速开始

请确保你已安装 [TB-CLI](https://github.com/TB-blog/TB-CLI)。 需了解更多详情请点击 [这里](https://github.com/TB-blog/TB-CLI)。

```shell
tb init
```
生成 TB 之后，打开浏览器地址栏输入 http://127.0.0.1:2333 即可。

## 开发

```shell
git clone git@github.com:HuangXiZhou/TB-2.0.git
cd TB-2.0
yarn
```
**注意:** *你需要添加配置文件。 如果你不是一位开发者，请使用 [TB-CLI](https://github.com/TB-blog/TB-CLI) 来生成 TB。*

如果是开发者，你需要在项目根目录下创建一个名为 `config.ts` 的配置文件.

```javascript
export default {
  token: '***', // 个人 Github access token
  nickname: 'nickname', // 昵称
  user: 'TB', // 你的 Github 用户名
  repo: 'TB', // 你 repo 名称
  motto: 'A man who loves the world.', // 格言
  gitalk: {
    useGitalk: true, // 使用评论组件, 更多详情请看 https://github.com/gitalk/gitalk
    clientID: '***',
    clientSecret: '***',
    repo: 'TB-comments',
    owner: 'TB',
    admin: ['TB']
  }
};
```

运行 `yarn run dev` 然后打开浏览器地址栏输入 http://127.0.0.1:2333。

## 贡献

如有任何的意见或建议，欢迎通过创建 Issue 或 Pull Request 的方式告知仓库管理员，请先阅读[贡献指南](CONTRIBUTING.md)。

## 证书

[MIT](LICENSE)。
