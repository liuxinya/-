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
  allChild = 0;
  itmeClick(item, index) {
    console.log(item)
    item.open = !item.open;
    // console.log(this.$refs.slider[index].parentNode.parentNode.parentNode.parentNode)
    // 重新计算当前点击的父元素的高
    if(item.children && item.level != 0){
      let domArr = [];
      let dom = 'this.$refs.slider[index]'; 
      for(let i = 0; i < item.level * 4; i ++) {
          dom += '.parentNode';
          // 每隔四个parentNode  就是一个父亲元素的dom元素
          if(i != 0 && i % 3 == 0) domArr.push(eval(dom))
      }
      console.log(domArr);
      if(!item.open) {
        // 当打开的时候 所有父亲元素的高 应该累加为当前 所有children的个数 * 24
        domArr.forEach((v, i) => {
          domArr[i].style.height = item.children[0].childs * 24 + 'px';
        })
      }else {
        domArr.forEach((v, i) => {
          // 当关闭的时候 所有父亲元素的高 应该累加为当前点击 项目之前  所有children的高 * 24
          domArr[i].style.height = item.childs * 24 + 'px';
        })
      }
    }
    // 当前点击项有子节点的话 只控制该节点的关闭和打开
    if(item.children) return;
    // 循环判断里层有没有children节点 有节点就将所有active取消
    this.loopChildren(this.menuData)
    item.active = true;
  }
  loopChildren(arr) {
    arr.forEach((v ,i) => {
      if(v.active == true) {
        v.active = false;
      }
      if(v.children) {
        this.loopChildren(v.children);
      }
    })
  }
  loopOpen(arr) {
    arr.forEach((v, i) => {
      if(v.chidlren && !v.open) {
        this.loopOpen(v.chidlren)
      }
    })
  }
  created() {
    this.loopAddAttr(this.menuData);
  }
  loopAddAttr(arr){
    arr.forEach((v) => {
      // 优化  如果已经添加 不需要再重复
      if(v.open) return;
      Vue.set(v, 'open', true);   //open 用于控制每个父节点的点击状态
      Vue.set(v, 'active', false);  // active 用于控制每个父节点的点击状态
      Vue.set(v,'level',this.level);  // 层级
      Vue.set(v, 'padding', this.level * 20)
      Vue.set(v,'childs',this.allChild)  // 这个属性是当前所有children个数的总和 用于动态计算父亲元素的高
      if(v.children) {
        this.level ++;   // 下次循环的开始应该是第1层级的开始
        this.allChild += v.children.length;   // 累加当前以及之前所有children个数
        arr.length
        this.loopAddAttr(v.children)
        this.level = 0;  // 本次循环完毕 下次又开始重新从第0层级开始
        this.allChild = 0;  // 每次循环完毕  应该从第0 开始累加
      }
    })
  }
  mounted() {
    
  }
}
