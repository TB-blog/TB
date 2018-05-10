import { Component, Provide, Vue } from 'vue-property-decorator';
import template from './ProgressBar.vue';

@Component({
  name: 'progress-bar',
  mixins: [template],
})
export default class ProgressBar extends Vue {
  @Provide() public percent: number = 0;
  @Provide() public show: boolean = false;
  @Provide() public canSuccess: boolean = true;
  @Provide() public duration: number = 3000;
  @Provide() public height: string = '2px';
  @Provide() public color: string = 'ffca2b';
  @Provide() public failedColor: string = 'ff0000';

  public start() {
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

  public set(num: number) {
    this.show = true;
    this.canSuccess = true;
    this.percent = Math.floor(num);
    return this;
  }

  public get() {
    return Math.floor(this.percent);
  }

  public increase(num: number) {
    this.percent = this.percent + Math.floor(num);
    return this;
  }

  public decrease(num: number) {
    this.percent = this.percent - Math.floor(num);
    return this;
  }

  public finish() {
    this.percent = 100;
    this.hide();
    return this;
  }

  public pause() {
    clearInterval((this as any)._timer);
    return this;
  }

  public hide() {
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

  public fail() {
    this.canSuccess = false;
    return this;
  }
}
