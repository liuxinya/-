import Vue from "vue";
import { MyComponent } from './components/index';
import '../src/assets/fonts/iconfont.css'
import '../src/styles/reset.less';
import router from './router'
const init = new Vue({
    el: '#app',
    // router,
    data: {
      name: '小明'
    },
    render: h => h(MyComponent)
})
