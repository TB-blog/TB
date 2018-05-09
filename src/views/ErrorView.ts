import { Component, Vue } from 'vue-property-decorator';
import template from './ErrorView.vue'

@Component({
  name: 'error-view',
  mixins: [template]
})
export default class ErrorView extends Vue {
  get code (): string {
    return this.$route.params.code;
  }
}
