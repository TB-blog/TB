import { Component, Prop, Vue } from 'vue-property-decorator';
import template from './Item.vue';

@Component({
  name: 'item',
  mixins: [template],
})
export default class Item extends Vue {
  @Prop() public item: object;
  @Prop() public type: string;
}
