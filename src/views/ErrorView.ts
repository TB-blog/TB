import { Component, Vue } from 'vue-property-decorator';
import template from '../../theme/layout/src/ErrorView.template.vue';
import '../../theme/source/style/ErrorView.styl';

@Component({
  name: 'error-view',
  mixins: [template],
})
export default class ErrorView extends Vue {
  get code(): string {
    return this.$route.params.code;
  }
}
