import Vue from 'vue'
import { Component, Prop} from 'vue-property-decorator'
import   * as WithRender from './menu-test.html?style=./menu-test.less';
@WithRender
@Component({
  components: {
  },
  props: ['testData']
})
export class MenuTest extends Vue {
    data = [];
    isactive = false;
    toggle(index,item) {
        // console.log(item)
        this.isactive = !this.isactive;
        this.data.forEach((v, i) => {
            if(i == index) v.active = !v.active;
        })
    }
    created() {
        // this.data = [...this.testData];
        // console.log(this.testData);
    }
}