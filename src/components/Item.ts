import { Component, Vue, Prop } from 'vue-property-decorator';
import template from './Item.vue'

@Component({
  name: 'item',
  mixins: [template]
})
export default class Item extends Vue {
  @Prop() item: object;
  @Prop() type: string;
}