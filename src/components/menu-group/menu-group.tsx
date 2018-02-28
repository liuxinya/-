import Vue from 'vue'
import { Component, Prop,Watch} from 'vue-property-decorator'
import { MenuItem } from '../menu-item/menu-item'
import   * as WithRender from './menu-group.html?style=./menu-group.less'
@WithRender
@Component({
  components: {
    MenuItem
  }
})
export class MenuGroup extends Vue {
  @Prop() menuGroupData: any[];
  itmeClick(item, index) {
    console.log(item)
    item.open = !item.open;
    // 当前点击项有子节点的话 只控制子节点的关闭和打开
    if(item.children) return;
    this.menuGroupData.forEach((v, i) => {
      // 有子节点  子节点取消active状态
      if(v.children) {
        v.children.forEach((item,index) => {item.active = false})
      }
      item.active = false;
      if(i == index) item.active = true;
    })
  }
  created() {
    console.log(this.menuGroupData)
    // 给所有menuGroupData添加一个新属性 open 用于控制每个父节点的点击状态
    // 给所有menuGroupData添加一个新属性 active 用于控制每个父节点的点击状态
    if(this.menuGroupData) {
      this.menuGroupData.forEach((item, index) => {
        Vue.set(item, 'open', true);
        Vue.set(item, 'active', false);
      })
    }
  }
}
