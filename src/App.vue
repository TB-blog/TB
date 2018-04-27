<style lang="stylus">
@import './App.styl';
</style>

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
          <a :href="`https://github.com/${this.$_config.user}`" target="_blank" rel="noopener">Github</a>
        </div>
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
    loading: true
  })
};
</script>
