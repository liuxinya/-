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
  padding = 20; // 不同level距离左边 初始距离
  // 这个event事件用于给外界暴露 一些属性 
  // item 是当前点击项 所包含的所有信息
  event(item) {
    this.$emit('event', item)
  }
  sendItem(item) {
    this.$emit('event', item)
  }
  mouseDown(index) {
    this.$emit('sendRef',this.$refs.slider[index])
  }
  sendRef(ref) {
    this.$emit('sendRef',ref)
  }
  itmeClick(item, index) {
    item.open = !item.open;
    // 当前点击等于children的个数  父元素应该做累加
    // console.log(this.$refs.slider[index])
    let oldNum = this.$refs.slider[index].parentNode.parentNode.dataset.oldNum;
    let domArr = []; // 用于存放当前点击所有的父级 dom对象
    let dom = 'this.$refs.slider[index]'; 
    for(let i = 0; i < item.level * 4; i ++) {
        dom += '.parentNode';
        // 每隔四个parentNode  就是一个父亲元素的dom元素
        if(i != 0 && i % 3 == 0) domArr.push(eval(dom))
    }
    if(item.children && !item.open) {
      // 当前点击的  如果已经点击过  那么num就等于上次菜单关闭之前的展开项
      // 如果没点击过  那就直接等于children的个数
      if(oldNum) {
        this.$refs.slider[index].parentNode.parentNode.dataset.num = parseInt(oldNum);
      }else {
        this.$refs.slider[index].parentNode.parentNode.dataset.num = item.children.length;
      }
      // domArr里面 是当前点击项 所有的父级菜单
      // 所有父级 应该累加 当前应该展开的个数
      domArr.forEach((v) => {
        // 如果有旧值 证明以前点击过 那么应该累加 关闭之前的展开项的个数
        if(oldNum) {
          v.parentNode.dataset.num = parseInt(v.parentNode.dataset.num) + parseInt(oldNum);
          // 重置当前点击项 所有父级dom的高
          v.style.height = 24 * v.parentNode.dataset.num + 'px';
        }else {
          // 没有旧值 就是第一次点击 
          v.parentNode.dataset.num = parseInt(v.parentNode.dataset.num) + item.children.length;
          // 重置当前点击项 所有父级dom的高
          v.style.height = 24 * v.parentNode.dataset.num + 'px';
        }
      })
    }else if(item.children && item.open) {
      domArr.forEach((v) => {
        v.parentNode.dataset.num = parseInt(v.parentNode.dataset.num) - parseInt(this.$refs.slider[index].parentNode.parentNode.dataset.num);
        // 重置当前点击项 所有父级dom的高
        v.style.height = 24 * v.parentNode.dataset.num + 'px';
      })
      this.$refs.slider[index].parentNode.parentNode.dataset.oldNum = parseInt(this.$refs.slider[index].parentNode.parentNode.dataset.num);
      this.$refs.slider[index].parentNode.parentNode.dataset.num = 0;
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
  created() {
    this.loopAddAttr(this.menuData);
  }
  loopAddAttr(arr){
    arr.forEach((v) => {
      // 优化  如果已经添加 不需要再重复
      if(v.open) return;
      Vue.set(v, 'open', true);   //open 用于控制每个父节点的点击状态
      Vue.set(v, 'active', false);  // active 用于控制每个父节点的点击状态
      Vue.set(v, 'level',this.level);  // 层级
      Vue.set(v, 'padding', this.level * this.padding);
      if(v.children) {
        let a = this.level;
        this.level ++;   // 下次循环的开始应该是第1层级的开始
        this.loopAddAttr(v.children)
        this.level = a;  // 本次循环完毕 下次又开始重新从兄弟层级属性循环开始之前开始
      }
    })
  }
  mounted() {
    
  }
}
