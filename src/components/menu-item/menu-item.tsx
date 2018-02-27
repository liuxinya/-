import Vue from 'vue'
import { Component, Prop, Watch} from 'vue-property-decorator'
import   * as WithRender from './menu-item.html?style=./menu-item.less';
@WithRender
@Component({
})
export class MenuItem extends Vue {
  @Prop() parentData: any[];
  @Prop() childrenData: any[];
  @Prop() level: number;
  @Prop() active: boolean;
  toggle(item, level, index) {
    console.log(this.parentData)
    // item.open = !item.open
    this.parentData.forEach((v, i) => {
      if(v.children) {
        v.children.forEach((v, i) => {
          v.active = false;
        })
      }
    })
    this.childrenData.forEach((v, i) => {
      if(i == index){
        v.active = true;
      }
    })
  }
  created() {
    if(this.childrenData) {
      this.childrenData.forEach((item, index) => {
        Vue.set(item, 'active', false);
        // Vue.set(item, 'open', false);
      })
    }
  }
}
