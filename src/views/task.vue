<template>
    <div class="hh-lodge-task">
        <LodgeHeadNav></LodgeHeadNav>
        <div class="hh-lodge-task-main">
            <div class="hh-team-detail-back" @click="prev"><</div>
            <div class="hh-lodge-task-upload">
                <div class="hh-lodge-task-btn" v-if="!upLoad" @click="upLoad = true">发布任务</div>
                <div class="hh-lodge-task-form" v-else>
                    <div class="hh-row hh-lodge-task-form-item clearfix" v-for="(item,index) in 5" :key="index">
                        <div class="hh-col-2 label">张三</div>
                        <input class="hh-col-10 ipt" type="text" placeholder="请输入任务（精炼）"/>
                    </div>
                    <div class="hh-lodge-task-form-group">
                        <div class="hh-lodge-task-form-btn primary">发布</div>
                        <div class="hh-lodge-task-form-btn" @click="upLoad = false">取消</div>
                    </div>
                </div>
            </div>
            <el-collapse class="hh-lodge-task-container" v-model="activeName" accordion>
                <el-collapse-item v-for="(item,index) in 5" :key="index" :name="index">
                    <template slot="title">
                       第{{index + 1}}次会议
                        <i class="time iconfont icon-shizhong"></i>
                        2017年5月18日
                    </template>
                    <div  class="hh-lodge-task-item hh-row clearfix" v-for="(item,index) in 5" :key="index">
                        <div class="hh-col-1 hh-col-xs-2">张三：</div>
                        <div class="hh-col-11 hh-col-xs-10">把任务完成阿瓦达案例的卡卡</div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import {getTeamId} from '../api/mylog'
    export default {
        data(){
            return {
                activeName : 0,
                upLoad : false,
            }
        },
        methods:{
            getTeamId(id){
                if (!this._lock){
                    this._lock = true;
                    getTeam({
                        id
                    })
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg){
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
            }
            // 获取权限
            // 获取所有团员
            // 获取所有任务
        },
        mounted() {
            if (this.$route.query.id){
                this.getTeamId(this.$route.query.id);
            } else{
                this.jumpTo('error');
            }
        }
    }
</script>

<style scoped>
    .hh-lodge-task{
        width: 70%;
        margin: 0 auto 50px;
    }
    .hh-lodge-task-main{
        position: relative;
        width: 100%;
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
    .hh-lodge-task-upload{
        padding: 40px 20px 20px;
    }
    .hh-lodge-task-btn{
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
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
    }
    .hh-lodge-task-form{

    }
    .hh-lodge-task-form-item{
        margin-top: 10px;
        height: 39px;
        line-height: 39px;
    }
    .hh-lodge-task-form-item .label{
        text-align: center;
    }
    .hh-lodge-task-form-item .ipt{
        height: 100%;
    }
    .hh-lodge-task-form-group{
        margin-top: 20px;
    }
    .hh-lodge-task-form-btn{
        display: inline-block;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
    }
    .hh-lodge-task-form-btn.primary{
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        margin-right: 30px;
    }
    .hh-lodge-task-container{
        border-top: 5px solid #eee;
        padding: 20px;
        box-sizing: border-box;
    }
    .hh-lodge-task-item{
        margin-top: 5px;
    }
    .time{
        margin-left: 20px;
    }
    @media only screen and (max-width : 767px){
        .hh-lodge-task{
            width: 95%;
        }
    }
</style>