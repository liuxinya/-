import Vue from 'vue'
import { Component, Prop} from 'vue-property-decorator'
import { MenuGroup } from './menu-group/menu-group'
import   * as WithRender from './index.html?style=./index.less';
import { swiper } from '../service/swiper-left.service';
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
  domLeftOffsetW: number = 0;
  domRightOffsetL: number = 0;
  bottomDivH: number = 0;
  bottomDivT: number = 0;
  // 这玩意只要点击 就会触发
  sendRef(dom, item) {
  }
  sendSelInfo(dom, item) {
  }
  created() {
  }
  mounted() {
    this.dragDivLR();
    this.dragDivB();
  }
  dragDivLR() {
    let domRight: any = document.querySelector(".right");
    let domLeft: any = document.querySelector(".left");
    swiper.swiper('.right-border', (e: E) =>{
      this.domLeftOffsetW= domLeft['offsetWidth'];
      this.domRightOffsetL= domRight['offsetLeft'];
    }, (e: E) => {
      if(Math.abs(e.startX - this.domLeftOffsetW) <= 2) {
        domLeft.style.width = this.domLeftOffsetW + e.disX + 'px';
        domRight.style.marginLeft = this.domRightOffsetL + e.disX + 'px';
      }
    }, true)
  }
  dragDivB() {
    let domB: any = document.querySelector('.right-bottom');
    swiper.swiper('.right-bottom', () => {
      this.bottomDivH = domB.offsetHeight;
      this.bottomDivT = domB.offsetTop;
    }, (e: E) => {
      if(Math.abs(e.startY - this.bottomDivT) <= 2) {
        domB.style.height = this.bottomDivH - e.disY + 'px';
      }
    }, false)
  }
  // 组件方法也可以直接声明为实例的方法
  // onClick (): void {
  // }
}
export interface E {
  e: MouseEvent;
  disX?: number;
  disY?: number;
  startX?: number;
  startY?: number;
}