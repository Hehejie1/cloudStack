<template>
    <div class="hh-share">
        <div class="hh-share-main-m">
            <i class="iconfont icon-zuozuo-"></i>
        </div>
        <div class="hh-share-login" v-if="isLogin">
            <div class="hh-share-login-nav">
                <img :src="imgs" alt="">
                <i class="iconfont icon-xiajiantou"></i>
            </div>
            <div class="hh-share-login-sub">
                <ul>
                    <li @click="signout">
                        <div class="hh-share-login-link">
                            <i class="iconfont icon-tuichu"></i>
                            退出
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else :class="isTop ? 'hh-share-reg fixed-nav' : 'hh-share-reg'">
            <span @click="changeModel('0')">请登录</span>
            <span @click="changeModel('1')">注册</span>
        </div>
        <div class="hh-share-reg-m" v-if="!isLogin" @click="changeModel('0')">
            登录
        </div>
        <div class="hh-share-main">
            <ul>
                <li>
                    <i class="iconfont icon-huojian" @click="toTop"></i>
                </li>
                <li class="wx">
                    <span>微信</span>
                    <div class="hh-share-sub">
                        <img src="https://www.wyjloveyl.com/hhImages/blog/wx.jpg" alt="">
                    </div>
                </li>
                <li>
                    <i class="iconfont icon-huojian-copy" @click="toButton"></i>
                </li>
            </ul>
        </div>
        <el-dialog :visible.sync="shareVisible" :modal-append-to-body="false"  center>
            <el-tabs v-model="shift" type="border-card" :stretch="true">
                <el-tab-pane label="登录" name="0">
                    <div class="hh-share-form-login">
                        <div class="hh-share-form-item">
                            <input class="hh-share-form-ipt" type="text" v-model="loginForm.name" placeholder="请输入用户名" id="search-3" />
                        </div>
                        <div class="hh-share-form-item">
                            <input class="hh-share-form-ipt" type="password" v-model="loginForm.password" placeholder="请输入密码" id="search-4"/>
                        </div>
                        <div class="hh-share-form-item">
                            <input type="radio" class="hh-share-form-radio" :checked="loginForm.isRead">
                            请仔细阅读 <span class="hh-protocol" @click="jumpTo('protocol')">《码虫博物馆用户协议及隐私政策》</span>
                        </div>
                        <div class="hh-share-form-btn" @click="logo">登 录</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" name="1">
                    <div class="hh-share-form-login" >
                        <div class="hh-share-form-item">
                            <input class="hh-share-form-ipt" type="text" v-model="regForm.name" placeholder="请输入用户名" @blur="isName" id="search-1" />
                        </div>
                        <div class="hh-share-form-item">
                            <input class="hh-share-form-ipt" type="password" v-model="regForm.password" placeholder="请输入密码" />
                        </div>
                        <div class="hh-share-form-item">
                            <input class="hh-share-form-ipt" type="number" v-model="regForm.iphone" placeholder="请输入手机号" id="search-2" />
                        </div>
                        <div class="hh-share-form-item">
                            <input class="hh-share-form-ipt" type="number" v-model="regForm.qq" placeholder="请输入qq号" />
                        </div>
                        <div class="hh-share-form-item">
                            <input class="hh-share-form-ipt" type="url" v-model="regForm.url" placeholder="请输入网址（选填）">
                        </div>
                        <div class="hh-share-form-btn" @click="reg">
                            注 册
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import {getCookie,setCookie} from '../../static/util/js/util'
    export default {
        data(){
            return{
                shareVisible : false,
                shift : '0',
                loginForm : {
                    name : '',
                    password : '',
                    isRead : true
                },
                regForm : {
                    name : '',
                    password : '',
                    iphone : '',
                    qq : '',
                    url : ''
                },
                isLogin : false,
                isTop : true,
                imgs : '',
                purview : 0
            }
        },
        methods: {
            changeModel(index){
                this.shareVisible=true;
                this.shift = index
            },
            logo(){
                if (!this._lock){
                    this._lock = true;
                    if (!this.loginForm.isRead){
                        this.$message({
                            message: '请同意规则',
                            type: 'warning',
                            customClass:'mzindex'
                        });
                        return;
                    }
                    if (!this.loginForm.name){
                        this.$message({
                            message: '请输入用户名',
                            type: 'warning',
                            customClass:'mzindex'
                        });
                        return;
                    }
                    if (!this.loginForm.password){
                        this.$message({
                            message: '请输入密码',
                            type: 'warning',
                            customClass:'mzindex'
                        });
                        return;
                    }
                    this.$axios.post("loginBlog",this.loginForm)
                        .then(res => {
                            if (res.data.msg == 2){
                                window.localStorage.setItem("name",this.loginForm.name);
                                window.localStorage.setItem("password",this.loginForm.password);
                                window.localStorage.setItem("uId",res.data.uId);
                                window.localStorage.setItem("purview",res.data.purview);
                                window.localStorage.setItem("qq",res.data.qq);
                                this.$store.commit('setUser',{
                                    'uId' : res.data.uId,
                                    'purview' : res.data.purview,
                                    'qq' : res.data.qq,
                                });
                                this.purview = res.data.purview;
                                this.imgs = 'http://q1.qlogo.cn/g?b=qq&nk=' + res.data.qq + '&s=640';
                                this.shareVisible = false;
                                this.isLogin = true;
                                this.$message({
                                    message: '登录成功',
                                    type: 'success',
                                    customClass:'mzindex'
                                });
                            } else if (res.data.msg == 1) {
                                this.$message({
                                    message: '密码错误',
                                    type: 'warning',
                                    customClass:'mzindex'
                                });
                            } else if (res.data.msg == 0) {
                                this.$message({
                                    message: '用户名不存在或者正在审核中',
                                    type: 'warning',
                                    customClass:'mzindex'
                                });
                            }else{
                                this.$message({
                                    message: '系统错误',
                                    type: 'warning',
                                    customClass:'mzindex'
                                });
                            }
                            this._lock = false;
                        })
                        .catch(err => {
                            this.$message({
                                message: '系统错误',
                                type: 'error',
                                customClass:'mzindex'
                            });
                            this._lock = false;
                        })
                }
            },
            reg(){
                if (!this.regForm.name){
                    this.$message({
                        message: '请输入用户名',
                        type: 'warning',
                        customClass:'mzindex'
                    });
                    return;
                }
                if (!this.regForm.password){
                    this.$message({
                        message: '请输入密码',
                        type: 'warning',
                        customClass:'mzindex'
                    });
                    return;
                }
                if (!this.regForm.iphone){
                    this.$message({
                        message: '请输入电话',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.regForm.qq){
                    this.$message({
                        message: '请输入qq',
                        type: 'warning',
                        customClass:'mzindex'
                    });
                    return;
                }
                this.$axios.post("regBlog",this.regForm)
                    .then(res => {
                        if (res.data.msg > 0){
                            this.$message({
                                message: '注册成功',
                                type: 'success',
                                customClass:'mzindex'
                            });
                            this.loginForm.name = this.regForm.name;
                            this.loginForm.password = this.regForm.password;
                            this.regForm = {
                                name : '',
                                password : '',
                                iphone : '',
                                qq : '',
                                url : ''
                            };
                            this.logo();
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                    })
            },
            changedata(){
                console.log(this.shift);
            },
            isName(){
                if (this.regForm.name){
                    this.$axios.post("isName",{
                        name : this.regForm.name
                    })
                        .then(res => {
                            if (res.data.msg > 0){
                                this.$message({
                                    message: '用户名已存在',
                                    type: 'warning',
                                    customClass:'mzindex'
                                });
                                this.regForm.name = "";
                            }
                        })
                } else{
                    this.$message({
                        message: '请输入用户名',
                        type: 'warning',
                        customClass:'mzindex'
                    });
                }
            },
            toAdmin(){
                if (this.purview > 99){
                    this.jumpTo("administratorIndex",{shift:0})
                } else if(this.purview > 66){
                    this.jumpTo("donateIndex")
                } else if(this.purview > 0){
                    this.jumpTo("hostIndex")
                }else{
                    this.jumpTo("adminIndex")
                }
            },
            signout(){
                this.$store.commit('delUser');
                this.isLogin = false;
            },
            toTop(){
                this.$( "html,body").animate({ "scrollTop" : 0 }, 1000);
            },
            toButton(){
                var windowHeight = parseInt(this.$("body").css("height" ));//整个页面的高度
                this.$( "html,body").animate({ "scrollTop" : windowHeight }, 1000);
            }
        },
        mounted() {
            let that = this;
            this.$(window).on("scroll",function () {
                if (that.$(window).scrollTop() > 100){
                    that.isTop = false;
                } else{
                    that.isTop = true;
                }
            });
            if(this.$store.getters.isLogin){
                this.isLogin = true;
                this.purview = this.$store.state.userInfo.purview;
                let qq = this.$store.state.userInfo.qq;
                this.imgs = 'http://q1.qlogo.cn/g?b=qq&nk=' + qq + '&s=640';
            }else{
                this.purview = 0;
            }
        }
    }
</script>

<style scoped>
    .mzindex{
        z-index: 3000 !important;
    }
    .hh-share{
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        z-index: 818919;
    }

    .hh-share-reg{
        position: absolute;
        right: 0;
        top: 10px;
        width: 130px;
        height: 39px;
        line-height: 39px;
        cursor: pointer;
        color: #000;
    }
    .hh-share-reg.fixed-nav{
        color: #409EFF;
    }
    .hh-share-nav .hh-share-nav-item{
        text-align: center;
        height: 39px;
        line-height: 39px;
        cursor: pointer;
    }
    .hh-share-nav .on{
        background: cyan;
    }
    .hh-share-reg-m{
        position: absolute;
        right: 10px;
        top: 18px;
        width: 50px;
        cursor: pointer;
        background: #eba01d;
        text-align: center;
        padding: 3px 3px;
    }
    .hh-share-reg span{
        margin-right: 15px;
    }
    .hh-share-main{
        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    .hh-share-main li{
        position: relative;
        width: 39px;
        height: 39px;
        text-align: center;
        line-height: 39px;
        cursor: pointer;
        color: #303133;
    }
    .hh-share-main li .hh-share-sub{
        opacity: 0;
        position: absolute;
        left: -95px;
        top: 50%;
        transform: translateY(-50%);
        padding: 5px;
        border: 1px solid #666;
        text-align: center;
        transition: all 1s linear;
    }
    .hh-share-main li.wx:hover .hh-share-sub{
        opacity: 1;
    }
    .hh-share-main li .hh-share-sub:before{
        content: "";
        position: absolute;
        right: -13px;
        top: 50%;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-left-color: #666;
        transform: translateY(-50%);
    }
    .hh-share-sub img{
        width: 80px;
        height: 80px;
    }
    .hh-share-main i{
        font-size: 26px;
        color: #a8a8a8;
    }
    .hh-share-main i:hover{
        color: #409EFF;
    }
    .hh-share-main-m{
        position: fixed;
        right: -5px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 20px 0 0 20px;
        cursor: pointer;
        background: #E6A23C;
        padding: 2px;
    }
    .hh-share-main-m i{
        color: #fff;
        font-size: 30px;
    }
    .hh-share-form-radio{
        width: 20px;
        height: 20px;
        display: inline-block;
    }
    .hh-share-form-btn{
        width: 80%;
        height: 39px;
        line-height: 39px;
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        border-radius: 4px;
        margin: auto;
    }
    @keyframes move {
        0%{transform: translateX(0)}
        25%{transform: translateX(10px)}
        50%{transform: translateX(0)}
        75%{transform: translateX(-10px)}
        100%{transform: translateX(0)}
    }
    .hh-share-main-m:hover .hh-share-main{
        display: block;
    }
    .hh-share-reg-m, .hh-share-main-m{
        display: none;
    }
    /*添加*/
    .hh-share-form-item{
        margin: 15px 0;
    }
    .hh-share-form-item input.hh-share-form-ipt{
        width: 100%;
        outline: none;
        webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
    .hh-share-form-item textarea{
        display: block;
        resize: vertical;
        padding: 5px 15px;
        line-height: 1.5;
        box-sizing: border-box;
        width: 100%;
        font-size: inherit;
        color: #606266;
        background-color: #fff;
        background-image: none;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    }
    /*登录成功*/
    .hh-share-login{
        position: relative;
        top: 10px;
        right: 20px;
        width: 70px;
    }
    .hh-share-login:hover .hh-share-login-sub{
        display: block;
    }
    .hh-share-login-nav{
        position: absolute;
        left: 0;
        top: 0;
        width: 70px;
        height: 39px;
    }
    .hh-share-login-nav img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
    .hh-share-login-sub{
        display: none;
        position: absolute;
        left: -60%;
        top: 39px;
        z-index: 1;
    }
    .hh-share-login-sub ul{
        position: relative;
        margin: 0;
        padding: 4px 0;
        text-align: left;
        list-style-type: none;
        background-color: #fff;
        background-clip: padding-box;
        border-radius: 4px;
        outline: none;
        -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.15);
        box-shadow: 0 2px 8px rgba(0,0,0,.15);
        -webkit-transform: translateZ(0);
    }
    .hh-share-login-sub ul li{
        clear: both;
        margin: 0;
        padding: 16px;
        color: rgba(0,0,0,.65);
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        white-space: nowrap;
        cursor: pointer;
        -webkit-transition: all .3s;
        transition: all .3s;
    }
    .hh-share-login-sub ul li:hover{
        background-color: rgba(236,114,89,.1);
    }
    .hh-share-login-sub ul li .hh-share-login-link{
        margin: -16px;
        padding: 16px;
        display: flex;
        align-items: center;
        color: #333;
        cursor: pointer;
    }
    .hh-share-login-sub ul li .hh-share-login-link i{
        font-size: 18px;
        color: #ec7259;
        margin-right: 12px;
    }
    .hh-protocol{
        color: blue;
    }
    /*登录成功*/


    @media only screen and (max-width: 767px){
        .hh-share-reg-m, .hh-share-main-m{
            display: block;
        }
        .hh-share-reg, .hh-share-main{
            display: none;
        }
    }
</style>


