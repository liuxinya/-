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
  @Prop() menuGroupData: any[]; // 当前这一组的对象
  @Prop() menuData: any[];   // 顶级对象
  level = 0;
  itmeClick(item, index) {
    console.log(item)
    // console.log(index);
    // console.log(this.$refs.childNode)
    // if(this.$refs.childNode[index]){
      //   // this.$refs.childNode[index].style.height='0px'
      //   console.log(this.$refs.childNode[index])
      //   this.$refs.childNode[index].style.height='48px'
      // }
      item.open = !item.open;
      console.log(this.menuData)
      // // 当前点击项有子节点的话 只控制该节点的关闭和打开
      if(item.children) return;
    // 循环判断里层有没有children节点 有节点就将所有active取消
    this.loop(this.menuData)
    item.active = true;
  }
  loop(arr) {
    arr.forEach((v ,i) => {
      v.active = false;
      if(v.children) {
        this.loop(v.children);
      }
    })
  }
  beforeEnter(el) {
    console.log(el)
  }
  afterEnter(el) {

  }
  created() {
    // console.log(this.menuGroupData)
    // console.log(this.menuData)
    // 给所有menuGroupData添加一个新属性 open 用于控制每个父节点的点击状态
    // 给所有menuGroupData添加一个新属性 active 用于控制每个父节点的点击状态
    // if(this.menuGroupData) {
    //   this.menuGroupData.forEach((item, index) => {
    //     Vue.set(item, 'open', true);
    //     Vue.set(item, 'active', false);
    //   })
    // }
    this.loopAddAttr(this.menuData);
  }
  loopAddAttr(arr){
    arr.forEach((v) => {
      // 优化  如果已经添加 不需要再重复
      if(v.open) return;
      Vue.set(v, 'open', true);
      Vue.set(v, 'active', false);
      Vue.set(v,'level',this.level);
      if(v.children) {
        this.level ++;   // 下次循环的开始应该是第1层级的开始
        this.loopAddAttr(v.children)
        this.level = 0;  // 本次循环完毕 下次又开始重新从第0层级开始
      }
    })
  }
  mounted() {
    // console.log(document.querySelectorAll('.submenu'))
    // document.querySelectorAll('.submenu').forEach((item, index) => {
    //   item.style.paddingLeft= 20*(index+1) + 'px';
    // })
  }
}
