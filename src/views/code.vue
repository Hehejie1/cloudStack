<template>
    <div class="hh-lodge-code">
        <LodgeHeadNav></LodgeHeadNav>
        <div class="hh-lodge-code-main">
            <div class="hh-team-detail-back" @click="prev"><</div>

            <div class="hh-team-code">
                github仓库：https://github.com/boluozhai/snowflake
            </div>
        </div>
    </div>
</template>

<script>
    import {getTeamId} from '../api/mylog'
    export default {
        data(){
            return {

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
    .hh-lodge-code{
        width: 70%;
        margin: 0 auto 50px;
    }
    .hh-lodge-code-main{
        position: relative;
        width: 100%;
        padding: 20px;
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
    .hh-team-code{
        margin-top: 20px;
    }


    @media only screen and (max-width : 767px){
        .hh-lodge-code{
            width: 95%;
        }
    }
</style>