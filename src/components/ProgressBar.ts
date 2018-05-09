import { Component, Vue, Provide } from 'vue-property-decorator';
import template from './ProgressBar.vue'

@Component({
  name: 'progress-bar',
  mixins: [template]
})
export default class ProgressBar extends Vue {
  @Provide() percent: number = 0;
  @Provide() show: boolean = false;
  @Provide() canSuccess: boolean = true;
  @Provide() duration: number = 3000;
  @Provide() height: string = '2px';
  @Provide() color: string = 'ffca2b';
  @Provide() failedColor: string = 'ff0000';

  start () {
    this.show = true;
    this.canSuccess = true;
    if ((this as any)._timer) {
      clearInterval((this as any)._timer);
      this.percent = 0;
    }
    (this as any)._cut = 10000 / Math.floor(this.duration);
    (this as any)._timer = setInterval(() => {
      this.increase((this as any)._cut * Math.random());
      if (this.percent > 95) {
        this.finish();
      }
    }, 100);
    return this;
  }

  set (num: number) {
    this.show = true;
    this.canSuccess = true;
    this.percent = Math.floor(num);
    return this;
  }

  get () {
    return Math.floor(this.percent);
  }

  increase (num: number) {
    this.percent = this.percent + Math.floor(num);
    return this;
  }

  decrease (num: number) {
    this.percent = this.percent - Math.floor(num);
    return this;
  }

  finish () {
    this.percent = 100;
    this.hide();
    return this;
  }

  pause () {
    clearInterval((this as any)._timer);
    return this;
  }

  hide () {
    clearInterval((this as any)._timer);
    (this as any)._timer = null;
    setTimeout(() => {
      this.show = false;
      (this as any).$nextTick(() => {
        setTimeout(() => {
          this.percent = 0;
        }, 200);
      });
    }, 500);
    return this;
  }

  fail () {
    this.canSuccess = false;
    return this;
  }
}
