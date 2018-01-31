import Vue from "vue";
import { MyComponent } from './modules/index';
const init = new Vue({
    el: '#app',
    data: {
      name: '小明'
    },
    render: h => h(MyComponent)
})
