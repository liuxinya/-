import Vue from 'vue'
import { Component, Prop, Watch} from 'vue-property-decorator'
import   * as WithRender from './menu-item.html?style=./menu-item.less';
@WithRender
@Component({
})
export class MenuItem extends Vue {
  @Prop() menuGroupData: any[];
  @Prop() menuItemData: any[];
  @Prop() level: number;
  @Prop() active: boolean;
  toggle(item, level, index) {
    // item.open = !item.open
    this.menuGroupData.forEach((v, i) => {
      if(v.children) {
        v.children.forEach((v, i) => {
          v.active = false;
        })
      }
      // 父亲所有节点的取消active状态
      v.active = false;
    })
    this.menuItemData.forEach((v, i) => {
      // 当前节点active
      if(i == index){
        v.active = true;
      }
    })
  }
  created() {
    console.log(this.menuGroupData)
    if(this.menuItemData) {
      this.menuItemData.forEach((item, index) => {
        Vue.set(item, 'active', false);
        // Vue.set(item, 'open', false);
      })
    }
  }
}
