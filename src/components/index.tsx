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
      "router": "download-center",
      "children": [
          {
              "title": "全部文件",
              "router": "all",
              "icon": "icon-cart",
              "component": "UnionDownloadCenterOfAllDownloadComponent"
          }
      ]
    },
    {
      "title": "22222222222222",
      "icon": "icon-account",
      "router": "download-center",
      "children": [
          {
              "title": "审计日志",
              "router": "all",
              "icon": "icon-cart",
              "component": "UnionDownloadCenterOfAllDownloadComponent"
          },
          {
              "title": "三生三世",
              "router": "all",
              "icon": "icon-cart",
              "component": "UnionDownloadCenterOfAllDownloadComponent",
              "children": [
                {
                    "title": "十里桃花",
                    "router": "all",
                    "icon": "icon-cart",
                    "component": "UnionDownloadCenterOfAllDownloadComponent",
                    "children": [
                      {
                          "title": "十里桃花1",
                          "router": "all",
                          "icon": "icon-cart",
                          "component": "UnionDownloadCenterOfAllDownloadComponent"
                      },
                    ]

                },
                {
                    "title": "嘟嘟嘟",
                    "router": "all",
                    "icon": "icon-cart",
                    "component": "UnionDownloadCenterOfAllDownloadComponent",
                    "children": [
                      {
                          "title": "十里桃花2",
                          "router": "all",
                          "icon": "icon-cart",
                          "component": "UnionDownloadCenterOfAllDownloadComponent",
                          "children": [
                            {
                                "title": "十里桃花",
                                "router": "all",
                                "icon": "icon-cart",
                                "component": "UnionDownloadCenterOfAllDownloadComponent",
                                "children": [
                                  {
                                      "title": "十里桃花",
                                      "router": "all",
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
      "router": "download-center",
    },
  ]
  created() {

  }

  // 组件方法也可以直接声明为实例的方法
  // onClick (): void {
  // }
}
