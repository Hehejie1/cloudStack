<template>
    <div class="hh-lodge-member">
        <LodgeHeadNav></LodgeHeadNav>
        <div class="hh-lodge-member-main">
            <div class="hh-team-detail-back" @click="prev"><</div>
            <!--添加人员-->
            <div class="hh-lodge-member-add">
                <div class="hh-lodge-member-nav">
                    申请人员:
                </div>
                <div class="hh-lodge-member-item clearfix" v-for="(item,index) in application" :key="index">
                    <img :src="'http://q1.qlogo.cn/g?b=qq&nk=' + item.qq + '&s=640'" alt="">
                    <span class="name">{{item.name}}</span>
                    <span class="name">{{item.career}}</span>
                    <span class="btn" @click="updateTeam(item.id,-1)">拒绝</span>
                    <span class="btn primary" @click="updateTeam(item.id,1)">同意</span>
                </div>
            </div>
            <!--群内人员-->
            <div class="hh-lodge-member-people">
                <div class="hh-lodge-member-nav">
                    团队人员:
                </div>
                <div class="hh-lodge-member-item clearfix" v-for="(item,index) in member" :key="index">
                    <img :src="'http://q1.qlogo.cn/g?b=qq&nk=' + item.qq + '&s=640'" alt="">
                    <span class="name">{{item.name}}</span>
                    <span class="name">{{item.career}}</span>
                    <span class="btn" v-if="item.qq == $store.state.userInfo.qq">我</span>
                    <span class="btn primary" v-if="index != 0 && item.qq == $store.state.userInfo.qq" @click="updateTeam(item.id,-1)">退出</span>
                    <span class="btn primary" v-if="index != 0 && member[0].qq == $store.state.userInfo.qq" @click="updateTeam(item.id,-1)">踢出</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTeamUser, getTeam, updateTeamUser} from '../api/mylog'
    export default {
        data(){
            return {
                application : [],
                member : []
            }
        },
        methods:{
            getTeamUser(tId){
                if (!this._lock){
                    this._lock = true;
                    getTeamUser({
                        tId
                    })
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg){
                                res.data.data.forEach((item,index) => {
                                    if (item.state == 1){
                                        this.member.push({
                                            name : item.name,
                                            qq : item.qq,
                                            career : item.career,
                                            id : item.id
                                        })
                                    }else if (item.state == 0) {
                                        this.application.push({
                                            name : item.name,
                                            qq : item.qq,
                                            career : item.career,
                                            id : item.id
                                        })
                                    }
                                })
                            }
                        })
                        .catch(err => {
                            this._lock = false;
                            console.log(err);
                        })
                }
            },
            getTeam(id){
                if (!this._lock){
                    this._lock = true;
                    this.application = [];
                    this.member = [];
                    getTeam({
                        id
                    })
                        .then(res => {
                            this._lock = false;
                            this.getTeamUser(id);
                            if (res.data.msg){
                                this.member.push({
                                    name : res.data.data[0].author,
                                    qq : res.data.data[0].qq,
                                    career : '队长'
                                })
                            }
                        })
                        .catch(err => {
                            this._lock = false;
                            console.log(err);
                        })
                }
            },
            prev(){
                this.$router.go(-1);
            },
            jumpTo(name, query){
                if (query){
                    this.$router.push({
                        name,
                        query
                    })
                } else{
                    this.$router.push({
                        name
                    })
                }
            },
            updateTeam(id,state){
                if (!this._lock) {
                    this._lock = true;
                    console.log(state);
                    updateTeamUser({
                        id,
                        state
                    })
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg){
                                if(state == 1){
                                    this.$message({
                                        message: '同意成功',
                                        type: 'success'
                                    });
                                }else{
                                    this.$message({
                                        message: '踢出成功',
                                        type: 'success'
                                    });
                                }
                                this.getTeam(this.$route.query.id);
                            }
                        })
                        .catch(err => {
                            this._lock = false;
                            console.log(err);
                        })
                }
            },
        },
        mounted() {
            if (this.$route.query.id){
                if (this.$store.getters.isLogin){
                    this.getTeam(this.$route.query.id);
                } else{
                    this.jumpTo('lodgeIndex');
                }
            } else{
                this.jumpTo('error');
            }
        }
    }
</script>

<style scoped>
    .hh-lodge-member{
        width: 70%;
        margin: 0 auto 50px;
    }
    .hh-lodge-member-main{
        position: relative;
        width: 100%;
        padding: 20px 0;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
    }
    .hh-team-detail-back{
        position: absolute;
        left: 10px;
        top: 10px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        background: #409EFF;
        color: #fff;
    }
    .hh-lodge-member-add{
        padding: 20px;
        border-bottom: 10px solid #eee;
    }
    .hh-lodge-member-item{
        height: 40px;
        margin-top: 10px;
        line-height: 40px;
    }
    .hh-lodge-member-item img{
        width: 40px;
        height: 40px;
        vertical-align: middle;
        border-radius: 50%;
    }
    .hh-lodge-member-item .name{
        margin-left: 10px;
        vertical-align: middle;
    }
    .hh-lodge-member-item .btn{
        float: right;
        margin-right: 10px;
        vertical-align: middle;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
    .hh-lodge-member-item .btn.primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
    }
    .hh-lodge-member-people{
        padding: 20px;
    }
    @media only screen and (max-width : 767px){
        .hh-lodge-member{
            width: 95%;
        }
        .hh-lodge-member-item .btn{
            padding: 5px 10px;
            margin: 8px 2px 0 0;
        }
    }
</style>