<style lang="stylus">
@import './ErrorView.styl';
</style>

<template>
  <div class="error-view">
    <h1>{{ code }}</h1>
    <p v-if="code === '404'" class="msg">Looks like you're looking for a page that doesn't exist. Or a page I might have just deleted. Either way,
      <router-link to="/">go to home page</router-link>
      or be sure to check the url, your spelling and try again.
    </p>
    <p v-else class="msg">
      Whoops! Service error...
    </p>
  </div>
</template>

<script>
export default {
  name: 'error-view',

  title () {
    return this.code
      ? this.code + ' Not Found'
      : '500' + ' Service Error';
  },

  computed: {
    code () {
      return this.$route.params.code;
    }
  }
};
</script>
