import Vue from 'vue'
import { Component, Prop} from 'vue-property-decorator'
import { MenuGroup } from './menu-group/menu-group'
import   * as WithRender from './index.html?style=./index.less';
@WithRender
@Component({
  components: {
    MenuGroup
  }
})
export class MyComponent extends Vue {
  // 初始数据可以直接声明为实例的属性
  // @Prop() qzx: string;
  menuData = [
    {
      "title": "1111111",
      "icon": "icon-account",
      "router": "aaaa",
      "children": [
          {
              "title": "全部文件",
              "router": "bbb",
              "icon": "icon-cart",
              "component": "UnionDownloadCenterOfAllDownloadComponent"
          }
      ]
    },
    {
      "title": "22222222222222",
      "icon": "icon-account",
      "router": "ccc",
      "children": [
          {
              "title": "审计日志",
              "router": "ddd",
              "icon": "icon-cart",
              "component": "UnionDownloadCenterOfAllDownloadComponent"
          },
          {
              "title": "三生三世",
              "router": "fff",
              "icon": "icon-cart",
              "component": "UnionDownloadCenterOfAllDownloadComponent",
              "children": [
                {
                    "title": "十里桃花",
                    "router": "ggg",
                    "icon": "icon-cart",
                    "component": "UnionDownloadCenterOfAllDownloadComponent",
                    "children": [
                      {
                          "title": "十里桃花1",
                          "router": "hhhh",
                          "icon": "icon-cart",
                          "component": "UnionDownloadCenterOfAllDownloadComponent"
                      },
                    ]

                },
                {
                    "title": "嘟嘟嘟",
                    "router": "iii",
                    "icon": "icon-cart",
                    "component": "UnionDownloadCenterOfAllDownloadComponent",
                    "children": [
                      {
                          "title": "十里桃花2",
                          "router": "jjj",
                          "icon": "icon-cart",
                          "component": "UnionDownloadCenterOfAllDownloadComponent",
                          "children": [
                            {
                                "title": "十里桃花",
                                "router": "kkk",
                                "icon": "icon-cart",
                                "component": "UnionDownloadCenterOfAllDownloadComponent",
                                "children": [
                                  {
                                      "title": "十里桃花",
                                      "router": "lll",
                                      "icon": "icon-cart",
                                      "component": "UnionDownloadCenterOfAllDownloadComponent"
                                  },
                                ]
                            },
                          ]
                      },
                    ]
                },
              ]
          }
      ]
    },
    {
      "title": "33333333",
      "icon": "icon-account",
      "router": "mmm",
    },
  ]
  dragPreviousDom = null;
  isReturn = true;
  selDomByCtrl = []; // 存放通过ctrl选择的所有的dom
  selItemByCtrl = []; // 存放通过ctrl选择的所有的item
  async getAttr(item) {
      // this.selDomByCtrl = [];
      // this.selItemByCtrl= [];
  }
  // 这玩意只要点击 就会触发
  sendRef(dom, item) {
      if(this.isReturn) {
        this.selDomByCtrl = [];
        this.selItemByCtrl= [];
        this.dragPreviousDom = dom;   // 单选 拖放 数据
        this.drag(this.dragPreviousDom);
      }else {
        this.isReturn = true;
      }
  }
  sendSelInfo(dom, item) {
    let a = true;
    this.selItemByCtrl.forEach( (v) => {
      if(v.router == item.router) {
        a = false;
      }
    } )
    if(a) {
      this.selDomByCtrl.push(dom);
      this.selItemByCtrl.push(item);
      console.log(this.selDomByCtrl);
      this.drag(this.selDomByCtrl);
      this.isReturn = false;
    }
  }
  drag(dom) {
    let targetDom = this.$refs.drag;
    targetDom['ondragenter'] = function(e) {
    }
    targetDom['ondragover'] = function(e) {
      e.preventDefault();
    }
    targetDom['ondrop'] = function(e) {
      if(dom.length) {
        dom.forEach((v) => {
          targetDom['innerText'] += v.children[1].innerText;
        })
      }else {
        targetDom['innerText'] = dom.children[1].innerText;
      }
      this.selDomByCtrl = [];
      this.selItemByCtrl= [];
    }
  }
  created() {
  }
  mounted() {
    // this.drag(this.dragPreviousDom);
  }

  // 组件方法也可以直接声明为实例的方法
  // onClick (): void {
  // }
}
