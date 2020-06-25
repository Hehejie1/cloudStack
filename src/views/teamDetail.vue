<template>
    <div class="hh-lodge-team-detail">
        <LodgeHeadNav></LodgeHeadNav>
        <div class="hh-team-detail-des">
            <div class="hh-team-detail-des-main" v-if="teamInfo.name">
                <h3>{{teamInfo.name}}</h3>
                <p>队长:{{teamInfo.author}} <span @click="deleteTeam">解散</span> <span @click="updateTeam">转让退出</span></p>
                <p>QQ群:{{teamInfo.qq_group}} <span class="btn" :data-clipboard-text="teamInfo.qq_group" @click="copy">复制</span></p>
                <p>git仓库: <a :href="teamInfo.git">{{teamInfo.git}}</a></p>
                <div class="hh-team-detail-content">
                    简介：
                    <span v-if="host && !edit" @click="edit = true">编辑</span>
                    <span v-if="edit" @click="edit = false">取消</span>
                    <span v-if="edit" @click="editTeam">修改</span>
                    <input type="text" class="hh-team-detail-content-wrap" v-model="teamInfo.dec" :disabled="!edit">
                </div>
            </div>
        </div>
<!--        <div class="hh-team-detail-process">-->
<!--            甘特图和燃尽图和鱼骨图进行项目进度的监工-->
<!--        </div>-->
        <div class="hh-team-detail-grad clearfix">
            <div class="hh-team-detail-grad-item" @click="jumpTo('lodgeModel',{id:$route.query.id})">
                <div class="hh-team-detail-grad-item-main">
                    <p>团队</p>
                    <p>模型</p>
                </div>
            </div>
            <div class="hh-team-detail-grad-item" @click="jumpTo('lodgeMember',{id:$route.query.id})">
                <div class="hh-team-detail-grad-item-main">
                    <p>团队</p>
                    <p>成员</p>
                </div>
            </div>
            <div class="hh-team-detail-grad-item" @click="jumpTo('myBlog',{id:$route.query.id})">
                <div class="hh-team-detail-grad-item-main">
                    <p>学习</p>
                    <p>中心</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTeam, updateTeam, deleteTeam} from '../api/mylog'
    import Clipboard from "clipboard";
    export default {
        data(){
            return {
                teamInfo : {},
                host : false,
                edit : false,
            }
        },
        methods:{
            // 获取团队信息
            getTeamId(id){
                if (!this._lock){
                    this._lock = true;
                    getTeam({id})
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg > 0){
                                this.teamInfo = res.data.data[0];
                                this.host = (this.teamInfo.qq == this.$store.state.userInfo.qq);
                            }
                        })
                        .catch(err => {
                            this._lock = false;
                            console.log(err);
                        })
                }
            },
            // 编辑团队简介
            editTeam(){
                this.edit = false;
                if (!this._lock){
                    this._lock = true;
                    updateTeam({
                        dec : this.teamInfo.dec,
                        tId : this.$route.query.id
                    })
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this._lock = false;
                        })
                }
            },
            // 删除队伍
            deleteTeam(){
                if (!this._lock){
                    this._lock = true;
                    deleteTeam({
                        id : this.$route.query.id,
                    })
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg > 0){
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.jumpTo('lodgeTeam');
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this._lock = false;
                        })
                }
            },
            // 更改团队信息。
            updateTeam(){
                this.edit = false;
                if (!this._lock){
                    this._lock = true;
                    updateTeam({
                        uId : this.$store.state,
                        tId : this.$route.query.id
                    })
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this._lock = false;
                        })
                }
            },
            // 复制QQ号
            copy: function() {
                var that = this;
                var clipboard = new Clipboard(".btn"); //单页面引用
                clipboard.on("success", e => {
                    that.$message({
                        message: '复制成功',
                        type: 'success'
                    });
                    clipboard.destroy();
                });
                clipboard.on("error", e => {
                    that.$message({
                        message: '复制失败',
                        type: 'warning'
                    });
                    clipboard.destroy();
                });
            },
        },
        created() {
            if (this.$route.query.id){
                this.getTeamId(this.$route.query.id);
            } else{
                this.jumpTo('error');
            }
        }
    }
</script>

<style scoped>
    .hh-lodge-team-detail{
        width: 70%;
        margin: 0 auto 50px;
    }
    .hh-team-detail-des{
        position: relative;
        width: 100%;
        background-color: rgba(255,255,255,.5);
    }
    .hh-team-detail-des-main{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        background: url("http://wyjloveyl.com/hhImages/blog/mylog/lodge/bg.jpg")no-repeat;
        background-size: 100% 100%;
    }
    .hh-team-detail-des h3{
        font-size: 2rem;
        text-align: center;
    }
    .hh-team-detail-des p{
        background: #fff;
        padding: 5px 15px;
        box-sizing: border-box;
    }
    .hh-team-detail-des p span{
        background: #409EFF;
        padding: 5px;
        border-radius: 10px;
        margin-left: 10px;
        color: #fff;
        cursor: pointer;
    }
    .hh-team-detail-des .hh-team-detail-content{
        padding: 20px;
        background: #fff;
        overflow: hidden;
    }
    .hh-team-detail-des .hh-team-detail-content span{
        float: right;
        margin-right: 10px;
        cursor: pointer;
    }
    .hh-team-detail-des .hh-team-detail-content .hh-team-detail-content-wrap{
        display: block;
        width: 100%;
        padding: 10px;
        background: #eee;
        border-radius: 10px;
        border: 1px solid #eee;
    }
    .hh-team-detail-process{
        width: 100%;
        height: 150px;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 10px;
        margin: 20px 0;
        background: rgba(255,255,255,.8);
    }
    .hh-team-detail-grad{
        margin-top: 10px;
    }
    .hh-team-detail-grad-item{
        float: left;
        width: 33%;
        margin-top: 20px;
        text-align: center;
    }
    .hh-team-detail-grad-item-main{
        display: inline-block;
        padding: 8px 18px;
        border: 1px solid #000;
        border-radius: 50%;
        cursor: pointer;
    }
    .hh-team-detail-grad-item-main:hover{
        background: #409EFF;
        color: #fff;
        border-color: #409EFF;
    }
    @media only screen and (max-width : 767px){
        .hh-lodge-team-detail{
            width: 100%;
        }
    }
</style>