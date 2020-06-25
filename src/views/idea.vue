<template>
    <div class="hh-lodge-idea">
        <LodgeHeadNav></LodgeHeadNav>
        <div class="hh-lodge-idea-main">
            <div class="hh-lodge-idea-nav clearfix">
                <!--提示信息-->
                <div class="hh-lodge-idea-prompt">
                    <p>欢迎分享你的idea</p>
                    <p>你的idea可以为其他团队作为项目参考</p>
                    <p>当你创建的idea被采用可以多获取一个组队机会</p>
                </div>
                <!--发布想法-->
                <div class="hh-lodge-form">
                    <div class="hh-lodge-form-headline">
                        <input type="text" maxlength="20" placeholder="请输入你的想法标题（最多20字）" v-model="creativity.headline" />
                        <span>{{creativity.des.length}}/20</span>
                    </div>
                    <div class="hh-lodge-form-des">
                        <textarea cols="30" rows="10" maxlength="100" placeholder="请输入你的想法详细内容（最多100字）" v-model="creativity.des"></textarea>
                        <span>{{creativity.des.length}}/100</span>
                    </div>
                    <div class="hh-lodge-btn on" @click="send">发布想法</div>
                </div>
            </div>
            <div class="hh-lodge-container" v-loading="loading">
                <LodgeIdeaItem :ideaLists="ideaLists"></LodgeIdeaItem>
            </div>
        </div>
    </div>
</template>

<script>
    import {saveCreativity, getCreativity} from '../api/mylog'
    export default {
        data(){
            return {
                loading : false,
                creativity : {
                    headline : '',
                    des : ''
                },
                ideaLists : []
            }
        },
        methods:{
            jumpTo(name, query){
                if (query){
                    this.$router.push({
                        name,
                        query : {
                            id : query
                        }
                    })
                } else{
                    this.$router.push({
                        name
                    })
                }
            },
            send(){
                if (!this.$store.getters.isLogin){
                    this.$message({
                        message: '请登录',
                        type: 'warning'
                    });
                    return;
                }
                else{
                    this.creativity.uId = this.$store.getters.userInfo.uId;
                }
                if (!this.creativity.headline){
                    this.$message({
                        message: '请输入想法标题',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.creativity.des){
                    this.$message({
                        message: '请输入想法详细内容',
                        type: 'warning'
                    });
                    return;
                }
                if (!this._lock){
                    this._lock = true;
                    saveCreativity(this.creativity)
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg){
                                this.$message({
                                    message: '发布成功',
                                    type: 'success'
                                });
                                this.creativity = {headline : '', des : ''};
                                this.getCreativity();
                            }
                        })
                        .catch(err => {
                            this._lock = false;
                            console.log(err);
                        })
                }
            },
            getCreativity(){
                if (!this._lock){
                    this._lock = true;
                    getCreativity()
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg){
                                this.ideaLists = res.data.data;
                            }
                        })
                        .catch(err => {
                            this._lock = false;
                            console.log(err);
                        })
                }
            }
        },
        mounted() {
            this.getCreativity();
        }
    }
</script>

<style scoped>
    .hh-lodge-idea{
        width: 70%;
        margin: auto;
    }
    .hh-lodge-idea-main{

    }
    .hh-lodge-idea-nav{
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(31,45,61,.1);
        border-radius: 4px;
        margin-bottom: 1rem;
        padding: 1rem 2.5rem;
    }
    .hh-lodge-form{
        float: left;
        width: 60%;
    }
    .hh-lodge-form-headline{
        position: relative;
        width: 100%;
        margin-bottom: 15px;
        border: 1px solid #d9d9d9;

    }
    .hh-lodge-form-headline span{
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .hh-lodge-form-headline input{
        width: 85%;
        height: 39px;
        line-height: 39px;
        box-sizing: border-box;
        padding-left: 8px;
        border: none;
        outline: none;
    }
    .hh-lodge-form-des{
        position: relative;
        width: 100%;
        border: 1px solid #d9d9d9;
    }
    .hh-lodge-form-des span{
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    .hh-lodge-form-des textarea{
        width: 100%;
        box-sizing: border-box;
        padding-left: 8px;
        resize: none;
        border: none;
    }
    .hh-lodge-btn{
        width: 20%;
        height: 39px;
        line-height: 39px;
        text-align: center;
        background: #ccc;
        color: #000;
        margin-top: 10px;
    }
    .hh-lodge-btn.on{
        background: #409EFF;
        color: #fff;
        cursor: pointer;
    }
    .hh-lodge-idea-prompt{
        width: 35%;
        float: right;
        padding: 2rem;
        box-sizing: border-box;
        background: rgba(0,0,0,.1);
        border: 1px solid #eee;
        border-radius: 10px;
    }
    .hh-lodge-team-add{
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 15px 0 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
    .hh-lodge-idea-container{
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(31,45,61,.1);
        border-radius: 4px;
        padding: 1rem 2.5rem;
        margin-bottom: 60px;
    }
    @media only screen and (max-width : 767px){
        .hh-lodge-idea{
            width: 95%;
            margin: auto;
        }
        .hh-lodge-form{
            float: left;
            width: 100%;
        }
        .hh-lodge-idea-prompt{
            float: none;
            width: 100%;
            margin-bottom: 15px;
        }
        .hh-lodge-btn{
            width: 40%;
        }
    }
</style>