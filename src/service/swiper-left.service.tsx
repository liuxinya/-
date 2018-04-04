import Vue from 'vue';

export class Swiper {
    startX: number = 0;   // 起点 x
    startY: number = 0;
    moveX: number = 0;   // 移动点 x
    moveY: number = 0;
    disX: number = 0;    // 移动距离 x
    disY: number = 0;
    swiper(selector: string, callbackS: Function, callbackM: Function, flag?: boolean ) {
        try {
            let dom: Element = document.querySelector(selector);
            dom.addEventListener("mousedown", (e: MouseEvent) => {
                flag ? this.startX = e.clientX : this.startY = e.clientY;
                callbackS(e)
                document.onmousemove = (e: MouseEvent) => {
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                    if(flag) {
                        this.moveX = e.clientX;
                        this.disX = this.moveX - this.startX;
                        callbackM({
                            e: e,
                            startX: this.startX,
                            disX: this.disX
                        })
                    }else {
                        this.moveY = e.clientY;
                        this.disY = this.moveY - this.startY;
                        callbackM({
                            e: e,
                            startY: this.startY,
                            disY: this.disY
                        })
                    }
                 }
                document.addEventListener('mouseup', (e: MouseEvent) => {
                    document.onmousemove = null;
                })
            })
        }catch(e) {
            
        }
    }
}
let swiper = new Swiper();
export { swiper }