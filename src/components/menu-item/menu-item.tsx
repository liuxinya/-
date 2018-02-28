import Vue from 'vue'
import { Component, Prop, Watch} from 'vue-property-decorator'
import   * as WithRender from './menu-item.html?style=./menu-item.less';
@WithRender
@Component({
})
export class MenuItem extends Vue {
  // @Prop() menuGroupData: any[];
  // @Prop() menuItemData: any[];
  // @Prop() level: number;
  // @Prop() active: boolean;
  // toggle(item, level, index) {
  // }
  // created() {
  // }
}
