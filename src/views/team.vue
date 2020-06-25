<template>
    <div class="hh-lodge-team">
        <LodgeHeadNav></LodgeHeadNav>
        <div class="hh-lodge-team-main">
            <div class="hh-lodge-team-nav">
                <!--项目类型-->
                <div class="hh-lodge-team-project">
                    <div class="project-label">
                        项目类型
                    </div>
                    <div class="project-option">
                        <div class="project-option-list">
                            <div v-for="(item,index) in lists" :key="index" :class="shift == index ? 'option-item active' : 'option-item'" @click="chooseItem(index)">{{item}}</div>
                        </div>
                    </div>
                </div>
                <div class="hh-lodge-team-btn clearfix">
                    <!--搜索-->
                    <div class="hh-lodge-team-search">
                        <input class="hh-lodge-team-ipt" type="text" placeholder="请输入团队名" v-model="teamName" @keydown.enter="searchTeam" />
                        <i class="iconfont icon-htmal5icon25" @click="searchTeam"></i>
                    </div>
                    <!--创建团队-->
                    <div class="hh-lodge-team-add" @click="jumpTo('lodgeAddTeam')">创建团队</div>
                    <!--我的团队-->
                    <div class="hh-lodge-team-add info" @click="getTeamLists('my')">我的团队</div>
                </div>
            </div>
            <div class="hh-lodge-team-container" v-loading="loading">
                <LodgeTeamItem :teamLists="teamLists"></LodgeTeamItem>
                <el-pagination
                        class="hh-lodge-team-pagination"
                        @current-change="handleCurrentChange"
                        :hide-on-single-page="true"
                        :total="teamLists.length"
                        :pager-count="5"
                        layout="prev, pager, next">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTeam} from '../api/mylog'
    export default {
        data(){
            return {
                teamName : '',
                shift : 0,
                currentPage : 1,
                loading : false,
                teamLists : [],
                lists : ['全部','Web 网站','APP 开发','微信公众号','HTML5 应用','小程序','桌面应用','嵌入式与智能硬件','数据采集与分析','其他']
            }
        },
        methods:{
            chooseItem(index){
                this.shift = index;
                this.getTeamLists();
            },
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
            handleCurrentChange(val){

            },
            getTeamLists(hName){
                if (!this._lock){
                    this.loading = true;
                    this._lock = true;
                    let team = {};
                    if (hName){
                        if (this.$store.getters.isLogin){
                            team.tId = this.$store.state.userInfo.uId;
                        } else{
                            this.$message({
                                message: '请登录',
                                type: 'warning'
                            });
                            this.loading = false;
                            this._lock = false;
                            return;
                        }
                    }
                    if (this.shift){
                        team.skip = (this.shift - 1) * 10;
                        team.limit = this.shift * 10;
                        team.type = this.lists[this.shift]
                    }
                    getTeam(team)
                        .then(res => {
                            if (res.data.msg){
                                this.teamLists = res.data.data;
                            }
                            this.loading = false;
                            this._lock = false;
                        })
                        .catch(err => {
                            this.loading = false;
                            this._lock = false;
                        })
                }
            },
            searchTeam(){
                if (this.teamName){

                    if (!this._lock) {
                        this.loading = true;
                        this._lock = true;
                        getTeam({
                            name: this.teamName
                        })
                            .then(res => {
                                this.loading = false;
                                this._lock = false;
                                if (res.data.msg) {
                                    this.teamLists = res.data.data;
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                this.loading = false;
                                this._lock = false;
                            })
                    }
                }
            }
        },
        mounted() {
            this.getTeamLists();
        }
    }
</script>

<style scoped>
    .hh-lodge-team{
        width: 70%;
        margin: auto;
    }
    .hh-lodge-team-main{

    }
    .hh-lodge-team-nav,.hh-lodge-team-container{
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(31,45,61,.1);
        border-radius: 4px;
        margin-bottom: 1rem;
        padding: 2rem;
    }
    .hh-lodge-team-project{
        padding-top: .5rem;
    }
    .project-label{
        display: inline-block;
        float: left;
        font-size: .9rem;
        line-height: 1.35rem;
        padding: .32rem 1.2rem;
        color: #727f8f;
    }
    .project-option{
        margin-left: 8rem;
        position: relative;
    }
    .project-option-list{
        padding-right: 6rem;
    }
    .option-item{
        display: inline-block;
        padding: .32rem 1.2rem;
        color: #273444;
        font-size: .9rem;
        line-height: 1.35rem;
        cursor: pointer;
        margin: 0 .1rem 1rem;
    }
    .option-item.active{
        border-radius: 2px;
        background: #4289dc;
        color: #fff;
    }
    .hh-lodge-team-btn{
        position: relative;
    }
    .hh-lodge-team-add{
        float: right;
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
        margin: 0 10px;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
    .hh-lodge-team-add.info{
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
    }
    .hh-lodge-team-search{
        position: relative;
        max-width: 13rem;
        display: inline-block;
    }
    .hh-lodge-team-search i{
        position: absolute;
        right: -23px;
        color: #8796a8;
        line-height: 2rem;
        cursor: pointer;
        top: 6px;
        font-size: 1.5rem;
    }
    .hh-lodge-team-ipt{
        height: 2rem;
        line-height: 2rem;
        background: #f9fafc;
        border: 1px solid #e0e6ed;
        border-radius: 2px;
        font-size: .9rem;
        color: #8796a8;
        min-width: inherit;
        padding-right: 2rem;
    }
    .hh-lodge-team-ipt:focus{
        border: 1px solid #e0e6ed !important;
    }
    .hh-lodge-team-container{
        margin-bottom: 50px;
    }
    .hh-lodge-team-pagination{
        text-align: center;
    }
    @media only screen and (max-width : 767px){
        .hh-lodge-team{
            width: 95%;
            margin: auto;
        }
        .hh-lodge-team-nav,.hh-lodge-team-container{
            padding: 1rem;
        }
        .project-label{
            display: inline-block;
            float: left;
            font-size: .9rem;
            line-height: 1.35rem;
            padding: .32rem 1.2rem;
            color: #727f8f;
        }
        .project-option{
            margin-left: 5.2rem;
        }
        .project-option-list{
            padding-right: 0;
        }
        .option-item{
            padding: .32rem .6rem;
            font-size: 0.7rem;
        }
        .hh-lodge-team-add{
            float: none;
            margin-top: 10px;
        }
    }
</style>