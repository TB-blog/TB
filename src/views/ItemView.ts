import * as hljs from 'highlight.js';
import * as marked from 'marked';
import { Component, Provide, Vue } from 'vue-property-decorator';
import template from '../../theme/layout/src/ItemView.template.vue';

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
  get comments() {
    return this.$store.getters.comments.map((el: any) => {
      el.body = marked(el.body);
      return el;
    });
  }
  get articleResource() {
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
    this.$store.dispatch('FETCH_COMMENTS', { issueNumber: [this.$route.params.id] });
  }
  public mounted() {
    this.initComments();
  }
}
