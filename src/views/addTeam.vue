<template>
    <div class="hh-lodge-add-team">
        <LodgeHeadNav></LodgeHeadNav>
        <div class="hh-lodge-add-team-main">
            <div class="hh-team-detail-back" @click="prev"><</div>
            <div class="hh-team-promote">
                <ul>
                    <li>1. 请先<span class="red">创建好QQ群</span>和<span class="red">github</span>再进行创建团队</li>
                    <li>2. 团队简介可以之后再进行修改</li>
                    <li>3. 团队最多成员为<span class="red">7人（包括队长）</span></li>
                    <li>4. 队长可以将贡献值小的、存在感低的成员进行踢出</li>
                    <li>5. <span class="red">队长就是项目经理</span>，尽量统筹协助大家完成任务</li>
                </ul>
            </div>
            <div class="hh-lodge-form">
                <div class="hh-lodge-form-item">
                    <input type="text" autocomplete="off" maxlength="20" placeholder="请输入团队名称（限20字）" v-model="team.name" />
                    <span>{{team.name.length}}/20</span>
                </div>
                <div class="hh-lodge-form-text">
                    <textarea cols="30" rows="10" maxlength="100" placeholder="请输入团队项目介绍（限100字）" v-model="team.dec"></textarea>
                    <span>{{team.dec.length}}/100</span>
                </div>
                <div class="hh-lodge-form-item">
                    <select v-model="team.model">
                        <option value="" disabled selected hidden>请选择合适开发模型</option>
                        <option v-for="(item,index) in modelList" :key="index" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="hh-lodge-form-item">
                    <select v-model="team.type">
                        <option value="" disabled selected hidden>请选择项目类型</option>
                        <option value="Web 网站">Web 网站</option>
                        <option value="APP 开发">APP 开发</option>
                        <option value="微信公众号">微信公众号</option>
                        <option value="HTML5 应用">HTML5 应用</option>
                        <option value="小程序">小程序</option>
                        <option value="桌面应用">桌面应用</option>
                        <option value="小程序">小程序</option>
                        <option value="嵌入式与智能硬件">嵌入式与智能硬件</option>
                        <option value="数据采集与分析">数据采集与分析</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                <div class="hh-lodge-form-item">
                    <input type="text" placeholder="请输入QQ群" v-model="team.qq" />
                </div>
                <div class="hh-lodge-form-item">
                    <input type="text" placeholder="请输入团队开发github地址" v-model="team.git" />
                </div>
                <div :class="(team.name && team.dec && team.qq && team.git) ? 'hh-lodge-btn on' : 'hh-lodge-btn'" @click="send">发布想法</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {saveTeam, getModel} from '../api/mylog'
    export default {
        data(){
            return {
                team : {
                    uId : 0,
                    name :'',
                    dec : '',
                    model: '',
                    type : '',
                    qq : '',
                    git : '',
                },
                modelList : []
            }
        },
        methods:{
            prev(){
                this.$router.go(-1);
            },
            send(){
                if (!this._lock){
                    if (!this.$store.getters.isLogin){
                        this.$message({
                            message: '请登录',
                            type: 'warning'
                        });
                        return;
                    }
                    else{
                        this.team.uId = this.$store.getters.userInfo.uId;
                    }
                    if (!this.team.name){
                        this.$message({
                            message: '请输入团队名称',
                            type: 'warning'
                        });
                        return;
                    }
                    if (!this.team.dec){
                        this.$message({
                            message: '请输入团队介绍',
                            type: 'warning'
                        });
                        return;
                    }
                    if (!this.team.model){
                        this.$message({
                            message: '请选择团队开发模型',
                            type: 'warning'
                        });
                        return;
                    }
                    if (!this.team.qq){
                        this.$message({
                            message: '请输入团队交流qq',
                            type: 'warning'
                        });
                        return;
                    }
                    if (!this.team.git){
                        this.$message({
                            message: '请输入团队代码地址',
                            type: 'warning'
                        });
                        return;
                    }
                    this._lock = true;
                    saveTeam(this.team)
                        .then(res=> {
                            this._lock = false;
                            if(res.data.msg > 0){
                                this.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });
                                this.$confirm('团队创建成功，跳转到团队页面', '提示', {
                                    confirmButtonText: '确定',
                                    type: 'warning'
                                }).then(() => {
                                    this.jumpTo('lodgeTeamDetail',{id : res.data.data.insertId});
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '错误'
                                    });
                                });
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
            if (this.$route.query.v){
                this.team.name = this.$store.getters.getIdea.name;
                this.team.dec = this.$store.getters.getIdea.dec;
            }
            getModel({})
                .then(res => {
                    if (res.data.msg){
                        this.modelList = res.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
</script>

<style scoped>
    .hh-lodge-add-team{
        width: 70%;
        margin: 0 auto 50px;
    }
    .hh-lodge-add-team-main{
        position: relative;
        width: 100%;
        padding: 30px 20px 20px;
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
    .hh-team-promote{
        padding: 20px;
        background: #eee;
        border-radius: 20px;
    }
    .hh-team-promote .red{
        color: #F56C6C;
    }
    .hh-lodge-form{
        margin-top: 20px;
    }
    .hh-lodge-form-item{
        position: relative;
        width: 100%;
        margin-top: 15px;
    }
    .hh-lodge-form-item span{
        position: absolute;
        right: 10px;
    }
    .hh-lodge-form-item input{
        width: 100%;
        height: 39px;
        line-height: 39px;
        box-sizing: border-box;
        padding-left: 8px;
        outline: none;
    }
    .hh-lodge-form-text{
        margin-top: 15px;
        position: relative;
        width: 100%;
    }
    .hh-lodge-form-text textarea{
        width: 100%;
        box-sizing: border-box;
        padding-left: 8px;
        resize: none;
    }
    .hh-lodge-form-text span{
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    .hh-lodge-form-item select{
        padding-right: 30px;
        cursor: pointer;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        outline: none;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }

    input:focus,textarea:focus{
        border: 1px solid #d9d9d9 !important;
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
    @media only screen and (max-width : 767px){
        .hh-lodge-add-team{
            width: 95%;
        }
    }
</style>