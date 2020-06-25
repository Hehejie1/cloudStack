var pool="ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890";
import "./jquery-3.4.1.min.js";

export default class Vercode {
    constructor(name){
        this.el = document.getElementById(name);
        this.w = this.el.offsetWidth * 2;
        this.h = this.el.offsetHeight * 2;
        this.el.addEventListener("click",this.draw.bind(this))
        this.draw()
    }
    draw(){
        //3.填充背景颜色,颜色要浅一点
        let ctx= this.el.getContext("2d");
        ctx.clearRect(0,0,this.w,this.h);
        this.el.style.background = this.rc(180,230);
        //4.随机产生字符串
        for(var i=0;i<4;i++){
            var c= pool[this.rn(0,pool.length)];//随机的字
            var fs=this.rn(this.w / 100 * 18,this.w / 100 * 40);//字体的大小
            var deg=this.rn(-30,30);//字体的旋转角度
            ctx.font=fs+'px Simhei';
            ctx.textBaseline="top";
            ctx.fillStyle=this.rc(80,150);
            ctx.save();
            ctx.rotate(deg*Math.PI/180);
            ctx.fillText(c,this.w * 0.2 * (i + 1),this.h * 0.15);
            ctx.restore();
        }
        // 5.随机产生5条干扰线,干扰线的颜色要浅一点
        for(var i=0;i<5;i++){
            ctx.beginPath();
            ctx.moveTo(this.rn(0,this.w),this.rn(0,this.h));
            ctx.lineTo(this.rn(0,this.w),this.rn(0,this.h));
            ctx.strokeStyle=this.rc(60,120);
            ctx.closePath();
            ctx.stroke();
        }
        //6.随机产生40个干扰的小点
        for(var i=0;i<40;i++){
            ctx.beginPath();
            ctx.arc(this.rn(0,this.w),this.rn(0,this.h),1,0,2*Math.PI);
            ctx.closePath();
            ctx.fillStyle=this.rc(150,200);
            ctx.fill();
        }
    }
    //1.新建一个函数产生随机数
    rn(min,max){
        return  parseInt(Math.random()*(max-min)+min);
    }
    //2.新建一个函数产生随机颜色
    rc(min,max,a = 1){
        var r=this.rn(min,max);
        var g=this.rn(min,max);
        var b=this.rn(min,max);
        return `rgba(${r},${g},${b},${a})`;
    }
}





