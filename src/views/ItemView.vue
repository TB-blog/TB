<style lang="stylus">
@import './ItemView.styl';
</style>

<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <h1>{{ item.title }}</h1>
        <span v-if="item.labels" class="labels" v-for="label in item.labels" :key="label.id">
          #{{ label.name }}
        </span>
        <p class="meta">
          Post By
          <a :href="`https://github.com/${this.$_config.user}`" target="_blank" rel="noopener">
            {{this.$_config.nickname}}
          </a>
          {{ item.created_at | timeAgo }}
        </p>
      </div>
      <div class="item-view-comments">
        <div class="content" v-html="htmlResource" v-highlight></div>
      </div>
    </template>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.min.css';
import 'highlightjs/styles/agate.css';
import Viewer from 'viewerjs';
import hljs from 'highlightjs/highlight.pack.min.js';
import marked from 'marked';

export default {
  name: 'item-view',

  data: () => ({
    loading: true,
    viewerOptions: {
      toolbar: false,
      tooltip: false,
      movable: false,
      rotatable: false,
      keyboard: false
    }
  }),

  directives: {
    highlight: {
      inserted: el => {
        let blocks = el.querySelectorAll('pre code');
        blocks.forEach(block => {
          hljs.highlightBlock(block);
        });
      }
    }
  },

  computed: {
    htmlResource () {
      return marked(this.item.body);
    },

    item () {
      if (this.$store.state.issues.length) {
        return this.$store.state.issues.filter(el => {
          return String(el.number) === this.$route.params.id;
        })[0];
      }
      return this.$store.state.singleIssue;
    }
  },

  asyncData ({ store, route: { params: { id } } }) {
    return store.dispatch('FETCH_SINGLEISSUE', { number: [id] });
  },

  title () {
    return this.item.title;
  },

  mounted () {
    hljs.initHighlightingOnLoad();
    Viewer.setDefaults(this.viewerOptions);
    new Viewer(document.querySelectorAll('.content')[0]);
  }
};
</script>
