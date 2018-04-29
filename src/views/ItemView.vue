<style lang="stylus">
@import './ItemView.styl';
</style>

<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <h1>{{ item.title }}</h1>
        <span v-if="item.labels" class="labels" v-for="label in item.labels" :key="label.id">
          <a :href="issueLabelUrl + label.name">#{{ label.name }}</a>
        </span>
        <p class="meta">
          Post By
          <a :href="`https://github.com/${this.$_config.user}`" target="_blank" rel="noopener">
            {{this.$_config.nickname}}
          </a>
          {{ item.created_at | timeAgo }}
        </p>
      </div>
      <div class="content" v-html="htmlResource" v-highlight></div>
      <div class="item-view-footer">
        <p class="meta">
          Updated {{ item.updated_at | timeAgo }}
        </p>
      </div>
      <div id="item-view-comments"></div>
    </template>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.min.css';
import 'highlightjs/styles/agate.css';
import 'gitalk/dist/gitalk.css';
import Viewer from 'viewerjs';
import hljs from 'highlightjs/highlight.pack.min.js';
import marked from 'marked';
import md5 from 'md5';

export default {
  name: 'item-view',

  data: () => ({
    showComments: false,
    loading: true,
    viewerOptions: {
      toolbar: false,
      tooltip: false,
      movable: false,
      rotatable: false,
      keyboard: false
    },
    issueLabelUrl: 'https://github.com/HuangXiZhou/blog/issues?q=is%3Aissue+is%3Aopen+label%3A'
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

  methods: {
    initViewer () {
      Viewer.setDefaults(this.viewerOptions);
      new Viewer(document.querySelectorAll('.content')[0]);
    },

    initComments () {
      if (process.browser) {
        const Gitalk = require('gitalk');
        const gitalk = new Gitalk({
          clientID: this.$_config.gitalk.clientID,
          clientSecret: this.$_config.gitalk.clientSecret,
          repo: this.$_config.gitalk.repo,
          owner: this.$_config.gitalk.owner,
          admin: this.$_config.gitalk.admin,
          id: md5(this.$route.fullPath),
          labels: ['comments'],
          distractionFreeMode: false,
          language: 'en'
        });

        gitalk.render('item-view-comments');
      }
    }
  },

  mounted () {
    hljs.initHighlightingOnLoad();
    this.initViewer();
    this.initComments();
  }
};
</script>
