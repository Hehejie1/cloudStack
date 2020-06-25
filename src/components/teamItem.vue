<template>
    <div class="hh-lodge-teams">
        <div class="hh-lodge-teams-item" v-for="(item,index) in teamLists" :key="index">
            <div class="hh-lodge-teams-item-lf">
                <h3>
                    {{item.name}}
                    <span v-if="item.member < 7" class="recruiting">招募中</span>
                    <span v-else class="recruiting">合力开发中</span>
                </h3>
                <p>队长：{{item.author}}</p>
                <p v-html="item.dec"></p>
            </div>
            <div class="hh-lodge-teams-item-rg">
                <span v-if="myTeamId.indexOf(item.id) > -1" class="hh-lodge-btn"  @click="jumpTo('lodgeTeamDetail',{id:item.id})">
                    进入团队
                </span>
                <span v-if="myTeamId.indexOf(item.id) < 0 && item.member < 7" class="hh-lodge-btn" @click="dislogAdd(item.id)">
                    申请加入
                </span>
            </div>
        </div>
        <el-dialog title="加入团队" :visible.sync="dialogAddTeam">
            <div class="hh-lodge-form-text">
                <textarea maxlength="100" placeholder="请输入你能做的工作（限100字）" v-model="career"></textarea>
                <span>{{career.length}}/100</span>
            </div>
            <el-button @click="dialogAddTeam = false">取 消</el-button>
            <el-button type="primary" @click="addTeam()">确 定</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import {getTeam, addTeam} from '../api/mylog'
    export default {
        data(){
            return {
                tId : '',
                myTeamId : [],
                career : '',
                dialogAddTeam : false
            }
        },
        props : ['teamLists'],
        methods:{
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
            dislogAdd(tId){
                if (!this.$store.getters.isLogin){
                    this.$message({
                        message: '请登录',
                        type: 'warning'
                    });
                    return;
                }
                this.tId = tId;
                this.dialogAddTeam = true;
            },
            addTeam(){
                if (!this._lock){
                    this._lock = true;
                    if (!this.career){
                        this.$message({
                            message: '请输入你的职业',
                            type: 'warning'
                        });
                        this._lock = false;
                        return;
                    }
                    else{
                        addTeam({
                            uId : this.$store.state.userInfo.uId,
                            career : this.career,
                            tId : this.tId
                        })
                            .then(res =>{
                                if (res.data.msg){
                                    this._lock = false;
                                    this.dialogAddTeam = false;
                                    this.$message({
                                        message: '申请成功，敬请期待',
                                        type: 'success'
                                    });
                                }
                            })
                            .catch(err => {
                                this._lock = false;
                            })

                    }


                }


            }
        },
        mounted() {
            if (this.$store.getters.isLogin){
                getTeam({
                    tId : this.$store.state.userInfo.uId
                })
                    .then(res => {
                        if (res.data.msg){
                            let that = this;
                            res.data.data.forEach((item,index) => {
                                this.myTeamId.push(item.id)
                            })
                            console.log(this.myTeamId);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else{

            }
        }
    }
</script>

<style scoped>
    .hh-lodge-teams{
        width: 100%;
    }
    .hh-lodge-teams-item{
        position: relative;
        border-bottom: 1px solid #eff2f7;
        padding: 1.5rem 0;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
    }
    .hh-lodge-teams-item-lf{
        width: 60%;
    }
    .hh-lodge-teams-item-lf h3 .recruiting{
        border-radius: 2px;
        font-size: .84rem;
        padding: 0 .36rem;
        margin: 0 .5rem;
        display: inline-block;
        height: 1.5rem;
        line-height: 1.5rem;
        vertical-align: middle;
        border: 1px solid #61c279;
        font-weight: 300;
        color: #61c279;
    }
    .hh-lodge-teams-item-lf p{
        color: #909399;
        overflow: hidden;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
    }
    .hh-lodge-teams-item-rg{
        position: absolute;
        right: 0;
        top: 0;
        line-height: 160px;
    }
    .hh-lodge-btn{
        margin-right: 10px;
        padding: 5px 10px;
        border: 1px solid #eee;
        cursor: pointer;
        border-radius: 10px;
        transition: all 0.5s;
    }
    .hh-lodge-btn:hover{
        background: #409EFF;
        color: #fff;
    }
    .hh-lodge-form-text{
        margin-top: 15px;
        position: relative;
        width: 100%;
        margin-bottom: 20px;
    }
    .hh-lodge-form-text textarea{
        width: 100% !important;
        height: 150px;
        box-sizing: border-box;
        padding-left: 8px;
        resize: none;
    }
    .hh-lodge-form-text span{
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    @media only screen and (max-width : 767px){

    }
</style>