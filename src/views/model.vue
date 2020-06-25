<template>
    <div class="hh-lodge-model">
        <LodgeHeadNav></LodgeHeadNav>
        <div class="hh-lodge-model-main">
            <div class="hh-team-detail-back" @click="prev"><</div>
            <div class="hh-lodge-model-change" v-if="host" @click="dialogVisible = true">
                修改模型
            </div>
            <div class="hh-lodge-model-headline">
                {{modelInfo.name}}
            </div>
            <div class="hh-lodge-model-content" v-html="modelInfo.content"></div>
            <div class="hh-lodge-model-data">
                <a v-for="(item,index) in modelInfo.link" :key="index" :href="item" target="_blank">模型参考资料{{index +
                    1}}</a>
            </div>
        </div>
        <el-dialog
                title="请选择合适开发模型"
                :visible.sync="dialogVisible"
                width="30%">
            <select v-model="model">
                <option value="" disabled selected hidden>请选择合适开发模型</option>
                <option v-for="(item,index) in modelList" :key="index" :value="item.id">{{item.name}}</option>
            </select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateTeam">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {getModel, updateTeam} from '../api/mylog'

    export default {
        data() {
            return {
                dialogVisible: false,
                model : '',
                host: false,
                modelInfo: {},
                modelList: []
            }
        },
        methods: {
            getModel(id) {
                if (!this._lock) {
                    this._lock = true;
                    getModel({id})
                        .then(res => {
                            this._lock = false;
                            if (res.data.msg) {
                                this.modelInfo = res.data.data[0];
                                this.model = this.modelInfo.id;
                                this.modelInfo.link = this.modelInfo.link.split(',');
                                this.host = (this.modelInfo.uId == this.$store.state.userInfo.uId);
                            }
                        })
                        .catch(err => {
                            this._lock = false;
                            console.log(err);
                        })
                }
            },
            prev() {
                this.$router.go(-1);
            },
            updateTeam(){
                if (this.model){
                    if (!this._lock) {
                        this._lock = true;
                        updateTeam({
                            tId : this.$route.query.id,
                            model:this.model
                        })
                            .then(res => {
                                this._lock = false;
                                if (res.data.msg){
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    this.dialogVisible = false;
                                    this.getModel(this.$route.query.id);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                this._lock = false;
                            })
                    }
                }

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
        },
        mounted() {
            if (this.$route.query.id) {
                this.getModel(this.$route.query.id);
                getModel({})
                    .then(res => {
                        if (res.data.msg) {
                            this.modelList = res.data.data;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                this.jumpTo('error');
            }
        }
    }
</script>

<style scoped>
    .hh-lodge-model {
        width: 70%;
        margin: 0 auto 50px;
    }

    .hh-lodge-model-main {
        position: relative;
        width: 100%;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-sizing: border-box;
    }

    .hh-team-detail-back {
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

    .hh-lodge-model-change {
        position: absolute;
        right: 50px;
        top: 50px;
        display: inline-block;
        padding: 3px 8px;
        border-radius: 5px;
        background-color: #409EFF;
        color: #fff;
        cursor: pointer;
    }

    .hh-lodge-model-headline {
        margin: 15px;
        font-size: 2rem;
    }

    .hh-lodge-model-content {
        margin: 15px 0;
        padding: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 10px #67C23A;
    }

    .hh-lodge-model-data {
        overflow: hidden;
        padding: 20px;
        margin: 15px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .hh-lodge-model-data a {
        display: inline-block;
        width: 33%;
        text-align: center;
    }

    .hh-lodge-model-data a:hover {
        text-decoration: underline;
    }

    .hh-lodge-model-team {
        padding: 10px;
        box-sizing: border-box;
        margin: 15px 0;
        color: #409EFF;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .hh-lodge-model-team-label {
        margin: 5px 0;
    }

    .hh-lodge-model-team-content {

    }
    select{
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

    @media only screen and (max-width: 767px) {
        .hh-lodge-model {
            width: 95%;
        }
    }
</style>