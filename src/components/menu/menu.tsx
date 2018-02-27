import Vue from 'vue'
import { Component, Prop} from 'vue-property-decorator'
import { MenuGroup } from '../menu-group/menu-group';
import   * as WithRender from './menu.html?style=./menu.less'

@WithRender
@Component({
    components: {
        MenuGroup
    }
})
export class Menu extends Vue {
  @Prop() menuData: any[];
  itmeClick(item) {
    console.log(item)
    Vue.set(item, item.active, true);
    item.active = !item.active;
  }
  created() {
    // 给所有menuData添加一个新属性 active 用于控制每个menu的点击状态
    this.menuData.forEach((item, index) => {
      Vue.set(item, 'active', true);
    })
  }
}