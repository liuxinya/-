import Vue from 'vue'
import { Component, Prop} from 'vue-property-decorator'
import   * as WithRender from './index.html?style=./index.less';
@WithRender
@Component
export class MyComponent extends Vue {
  // 初始数据可以直接声明为实例的属性
  @Prop() qzx: string;
  message: number = 123;
  created() {

  }

  // 组件方法也可以直接声明为实例的方法
  onClick (): void {
    window.alert(this.message);
  }
}
