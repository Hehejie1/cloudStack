<template>
    <div class="hh-lodge-file">
        <LodgeHeadNav></LodgeHeadNav>
        <input type="file" id="uploadFile" style="display: none" ref="uploadImg" @change="uploadFile" multiple />
        <div class="hh-lodge-file-main">
            <div class="hh-team-detail-back" @click="prev"><</div>
            <el-collapse class="hh-lodge-file-collapse" v-model="activeName" accordion>
                <el-collapse-item v-for="(item,index) in fileList" :key="index" :title="item.title" :name="index">
                    <div class="hh-lodge-file-collapse-item">
                        <div class="hh-lodge-file-upload">
                            <label for="uploadFile" class="hh-lodge-file-btn">上传文件</label>
                        </div>
                        <div class="hh-lodge-file-item clearfix">
                            <i class="iconfont icon-wenjian"></i>
                            <span class="name">我看看.docx</span>
                            <span class="name">(颤三)</span>
                            <span class="btn">下载</span>
                            <span class="btn">预览</span>
                            <span class="btn">删除</span>
                        </div>
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
                activeName: 0,
                fileList : [
                    {
                        title : '进群必看',
                        child : []
                    }, {
                        title : '需求分析',
                        child : []
                    },{
                        title : '软件概要设计',
                        child : []
                    },{
                        title : '软件详细设计',
                        child : []
                    }, {
                        title : '编码',
                        child : []
                    }, {
                        title : '测试',
                        child : []
                    }, {
                        title : '软件交付',
                        child : []
                    },{
                        title : '软件维护',
                        child : []
                    },{
                        title : '团队讨论',
                        child : []
                    },{
                        title : '其他',
                        child : []
                    },
                ]
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
            },
            uploadFile(){

            }
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
    .hh-lodge-file{
         width: 70%;
         margin: 0 auto 50px;
     }
    .hh-lodge-file-main{
        position: relative;
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
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
    .hh-lodge-file-collapse{

    }
    .hh-lodge-file-collapse-item{

    }
    .hh-lodge-file-upload{

    }
    .hh-lodge-file-btn{
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
    .hh-lodge-file-item{
        margin-top: 15px;
    }
    .hh-lodge-file-item i{
        color: #5ABE64;
        vertical-align: middle;
    }
    .hh-lodge-file-item .name{
        vertical-align: middle;
    }
    .hh-lodge-file-item .btn{
        float: right;
        margin-right: 10px;
        cursor: pointer;
    }
    .hh-lodge-file-item .btn:hover{
        color: #409eff;
        border-bottom: 1px solid #409eff;
    }
    @media only screen and (max-width : 767px){
        .hh-lodge-file{
            width: 95%;
        }
    }
</style>