import * as hljs from 'highlight.js';
import 'highlight.js/styles/agate.css';
import * as marked from 'marked';
import { Component, Provide, Vue } from 'vue-property-decorator';
import template from '../../theme/theme-geek-dark/layout/src/ItemView.template.vue';
import '../../theme/theme-geek-dark/source/style/ItemView.styl';

@Component({
  name: 'item-view',
  mixins: [template],
  directives: {
    highlight: {
      inserted: (el: any) => {
        const blocks = el.querySelectorAll('pre code');
        blocks.forEach((block: any) => {
          hljs.highlightBlock(block);
        });
      },
    },
  },
})
export default class ItemView extends Vue {
  @Provide() public showComments: boolean = false;
  @Provide() public loading: boolean = true;

  get labelUrl() {
    return 'https://github.com/'
    + (this as any).$_config.user
    + '/'
    + (this as any).$_config.repo
    + '/issues?q=is%3Aissue+is%3Aopen+label%3A';
  }
  get htmlResource() {
    return marked(this.item.body);
  }
  get item() {
    if (this.$store.state.issues.length) {
      return this.$store.state.issues.filter((el: any) => {
        return String(el.number) === this.$route.params.id;
      })[0];
    }
    return this.$store.getters.singleIssue;
  }

  public initComments() {
    if (process.browser && (this as any).$_config.gitalk.useGitalk) {
      const gitalk = require('gitalk');
      const comment = new gitalk({
        clientID: (this as any).$_config.gitalk.clientID,
        clientSecret: (this as any).$_config.gitalk.clientSecret,
        repo: (this as any).$_config.gitalk.repo,
        owner: (this as any).$_config.gitalk.owner,
        admin: (this as any).$_config.gitalk.admin,
        id: this.$route.fullPath,
        labels: ['comments'],
        distractionFreeMode: true,
        language: 'en',
      });
      return comment.render('item-view-comments');
    }
    return;
  }
  public mounted() {
    hljs.initHighlightingOnLoad();
    this.initComments();
  }
}
