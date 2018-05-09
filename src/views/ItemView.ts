import { Component, Vue, Provide } from 'vue-property-decorator';
import template from './ItemView.vue';
import 'highlight.js/styles/agate.css';
import * as hljs from 'highlight.js';
import * as marked from 'marked';

import { Store } from 'vuex';
import { State } from '../store/index';

interface AsyncData{
  store: Store<State>;
  route: {
    params: {
      id: number
    }
  };
};

@Component({
  name: 'item-view',
  mixins: [template],
  directives: {
    highlight: {
      inserted: (el: any) => {
        let blocks = el.querySelectorAll('pre code');
        blocks.forEach((block: any) => {
          hljs.highlightBlock(block);
        });
      }
    }
  }
})
export default class ItemView extends Vue {
  @Provide() showComments: boolean = false;
  @Provide() loading: boolean = true;

  get labelUrl () {
    return `https://github.com/${(this as any).$_config.user}/${(this as any).$_config.repo}/issues?q=is%3Aissue+is%3Aopen+label%3A`;
  }

  get htmlResource () {
    return marked(this.item.body);
  }

  get item () {
    if (this.$store.state.issues.length) {
      return this.$store.state.issues.filter((el: any) => {
        return String(el.number) === this.$route.params.id;
      })[0];
    }
    return this.$store.state.singleIssue;
  }

  initComments () {
    if (process.browser) {
      const Gitalk = require('gitalk');
      const gitalk = new Gitalk({
        clientID: (this as any).$_config.gitalk.clientID,
        clientSecret: (this as any).$_config.gitalk.clientSecret,
        repo: (this as any).$_config.gitalk.repo,
        owner: (this as any).$_config.gitalk.owner,
        admin: (this as any).$_config.gitalk.admin,
        id: this.$route.fullPath,
        labels: ['comments'],
        distractionFreeMode: true,
        language: 'en'
      });
      return gitalk.render('item-view-comments');
    }
    return false;
  }

  mounted () {
    hljs.initHighlightingOnLoad();
    this.initComments();
  }
}
