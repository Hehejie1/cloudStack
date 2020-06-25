<template>
    <div class="hh-lodge">

        <div class="hh-lodge-main">
            <div class="hh-lodge-main-grid">
                <div class="hh-lodge-main-container">
                    <p class="hh-lodge-main-motto">码虫小屋-云开发栈</p>
                </div>
                <div class="hh-lodge-main-container">
                    <p class="hh-lodge-main-sub-motto">
                        提供您所需的全套软件合作开发服务<br>
                    </p>
                </div>
                <div class="btn-list">
                    <span class="start-button" @click="jumpTo('lodgeIdea')">分享你的Idea</span>
                    <span class="start-button on" @click="jumpTo('lodgeTeam')">查看项目列表</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            jumpTo(name){
                this.$router.push({
                    name
                })
            }
        },
        mounted() {
            let that = this;
            that.$(".hh-lodge").height(that.$(window).height());
            that.$(window).resize(function () {
                that.$(".hh-lodge").height(that.$(window).height());
            });
        }
    }
</script>

<style scoped>
    .hh-lodge{
        width: 100%;
        background: url(https://assets.yingxuan.io/11.png) center/cover no-repeat;
        box-sizing: border-box;
    }
    .hh-lodge:after{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        background: left rgba(16,63,127,.3);
    }
    .hh-lodge-main{
        width: 100%;
        z-index: -2;
    }
    .hh-lodge-main-grid{
        position: relative;
        background: 0 0;
        border: 0;
        height: calc(100vh - 115px);
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        z-index: 1;
    }
    .hh-lodge-main-container{
        width: 100%;
        z-index: -2;
        margin-top: 1.5rem;
    }
    .hh-lodge-main-motto{
        text-align: center;
        font-size: 3rem;
        line-height: 9rem;
        color: #fff;
    }
    .hh-lodge-main-sub-motto{
        text-align: center;
        font-size: 1.3rem;
        color: #fff;
        line-height: 1.8rem;
        font-weight: 200;
    }
    .btn-list{
        text-align: center;
    }
    .start-button{
        height: 49px;
        text-align: center;
        background-color: #4187DB;
        color: #fff;
        border-radius: 5px;
        font-size: 1.3rem;
        cursor: pointer;
        -webkit-transition: .3s linear;
        transition: .3s linear;
        margin: 53px auto 0;
        border: none;
        width: 13.8rem;
        line-height: 49px;
        display: inline-block;
    }
    .start-button:hover{
        background: #FFF;
        color: #4289DB;
    }
   .on{
        background: 0 0;
        border: 1px solid #FFF;
        margin-left: 40px;
    }
    @media only screen and (max-width : 767px){
        .hh-lodge-main-motto{
            text-align: center;
            font-size: 2rem;
            line-height: 3rem;
            padding: 0 2.1rem;
        }
        .hh-lodge-main-sub-motto{
            text-align: center;
            font-size: 1rem;
            line-height: 1.8rem;
        }
        .start-button{
            display: block;
        }
        .start-button.on{
            margin-top: 20px;
            margin-left: 0;
        }
    }
</style>