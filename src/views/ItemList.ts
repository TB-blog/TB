import { Component, Vue, Prop, Provide, Watch } from 'vue-property-decorator';
import template from './ItemList.vue'
import Item from '../components/Item';

@Component({
  name: 'itemList-view',
  mixins: [template],
  components: {
    Item
  }
})
export default class ItemList extends Vue {
  @Prop() type: string;

  @Provide() transition: string = 'slide-right';
  @Provide() displayedPage: number = 1;
  @Provide() displayedItems: object = this.type === 'blog' ? this.$store.getters.issues : this.$store.getters.repos;

  get page (): number {
    return Number(this.$route.params.page) || 1;
  }
  get maxPage (): number {
    return this.$store.state.maxPage;
  }
  get hasMore (): boolean {
    return this.page < this.maxPage;
  }

  beforeMount () {
    if ((this as any).$root._isMounted && this.type === 'blog') {
      this.loadItems(this.page);
    }
  }

  @Watch('page')
  onLoadItems (to: number, from: number) {
    this.loadItems(to, from);
  }

  loadItems (to: number = this.page, from: number = -1) {
    (this as any).$bar.start();
    this.$store.dispatch('FETCH_ISSUES', {
      page: this.page,
      size: 10
    }).then(() => {
      if (this.page < 0 || this.page > this.maxPage) {
        this.$router.replace(`/${this.type}/1`);
        return;
      }
      this.transition = from === -1
        ? null
        : to > from ? 'slide-left' : 'slide-right';
      this.displayedPage = to;
      this.displayedItems = this.$store.getters.issues;
      (this as any).$bar.finish();
    });
  }
}
