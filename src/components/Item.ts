import { Component, Prop, Vue } from 'vue-property-decorator';
import template from '../../theme/theme-geek-dark/layout/src/components/Item.template.vue';
import '../../theme/theme-geek-dark/source/style/Item.styl';

@Component({
  name: 'item',
  mixins: [template],
})
export default class Item extends Vue {
  @Prop() public item: object;
  @Prop() public type: string;
}
