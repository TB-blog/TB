<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <div class="navBar">
          <router-link to="/" exact>
            <img class="logo" src="~public/logo-48.png" alt="logo">
          </router-link>
          <router-link to="/blog">Blog</router-link>
          <router-link to="/repo">Repo</router-link>
          <a href="https://github.com/HuangXiZhou" target="_blank" rel="noopener">Github</a>
        </div>
        <!--<div class="navBar" :class="{ 'is-hidden-motto': showMotto }">
          <h4 class="motto">
            万里不惜死，朝得成功
          </h4>
        </div>-->
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    loading: true,
    // showMotto: false
  }),

  // mounted () {
  //   let scrollAction = {
  //     y: null
  //   }
  //   let scrollDirection = null

  //   function scrollFunc() {
  //       if (typeof scrollAction.y === null) {
  //           scrollAction.y = window.pageYOffset;
  //       }
  //       var diff = scrollAction.y - window.pageYOffset;
  //       if (diff < 0) {
  //         scrollDirection = 'down'
  //       } else if (diff > 0) {
  //         scrollDirection = 'up'
  //       } else {
  //         // First scroll event
  //       }
  //       scrollAction.y = window.pageYOffset;
  //   }

  //   window.onscroll = e => {
  //     scrollFunc()
  //     this.showMotto = scrollDirection === 'down'
  //       ? true
  //       : false
  //   }
  // }
}
</script>

<style lang="stylus">
html
  border-top 2px solid #c9cacc

body
  font-family "Menlo", "Meslo LG", monospace
  font-size 14px
  font-weight 400
  // background-color lighten(#eceef1, 30%)
  margin 0
  // color #2c3e50
  overflow-y scroll
  color #c9cacc
  background-color #1d1f21

a
  color #c9cacc
  text-decoration none

.header
  background-color #1d1f21
  height 55px
  overflow hidden
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
  a
    color #d480aa
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0

.logo
  height 24px
  margin-right 10px
  display inline-block
  vertical-align middle

.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

.navBar
  transition transform .3s

.motto
  color #fff
  font-weight 400

.navBar-hidden
  display none

.is-hidden-nav
  transform translateY(-200%)

.is-hidden-motto
  transform translateY(-225%)

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none
</style>
