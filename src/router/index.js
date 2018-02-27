import Vue from 'vue'
import Router from 'vue-router'
import MenuTest from '../components/menu-test/menu-test'
import { Component, Prop} from 'vue-property-decorator'
Vue.use(Router)
export default new Router({
    routes: [{
        path: '/menu-test',
        name: 'MenuTest',
        component: MenuTest
      }
    ]
  })