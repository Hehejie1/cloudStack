<template>
    <div class="hh-lodge-idea">
        <div class="hh-lodge-idea-item" v-for="(item,index) in ideaLists" :key="index">
            <h3>{{item.headline}}
                <span>{{item.author}}</span>
                <span class="hh-lodge-btn" @click="detail(item)">创建团队</span>
            </h3>
            <p>{{item.des}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props : ['ideaLists'],
        data(){
            return {

            }
        },
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
            detail(idea){
                this.$store.commit('setIdea',{
                    name : idea.headline,
                    dec : idea.des
                });
                this.jumpTo('lodgeAddTeam',{v:2});
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .hh-lodge-idea{
        width: 100%;
    }
    .hh-lodge-idea-item{
        position: relative;
        background: #fff;
        border-bottom: 1px solid #eff2f7;
        padding: 1.5rem 0.5rem;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 10px;
        margin-top: 10px;
    }
    h3 span{
        font-size: 16px;
        margin-left: 15px;
        vertical-align: bottom;
    }
    p{
        width: 60%;
        color: #909399;
        word-wrap: break-word;
    }
    .hh-lodge-btn{
        float: right;
        margin-right: 10px;
        padding: 5px 10px;
        border: 1px solid #409EFF;
        cursor: pointer;
        border-radius: 10px;
        transition: all 0.5s;
        background: #409EFF;
        color: #fff;
    }
    .hh-lodge-btn:hover{
        background: transparent;
        color: #409EFF;
    }
    @media only screen and (max-width : 767px){

    }
</style>