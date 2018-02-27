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
  itmeClick(item) {
    console.log(item)
    Vue.set(item, item.active, true);
    item.active = !item.active;
  }
  created() {
    // 给所有menuData添加一个新属性 active 用于控制每个menu的点击状态
    if(this.menuGroupData) {
      this.menuGroupData.forEach((item, index) => {
        Vue.set(item, 'active', true);
      })
    }
  }
}
