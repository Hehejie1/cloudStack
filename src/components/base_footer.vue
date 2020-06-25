<template>
    <div class="hh-footer">
        <div class="hh-footer-main">
            <font color="#f1607d">码</font>
            <font color="#ffa500">虫</font>
            <font color="#e5e802">博</font>
            <font color="#3bff23">物</font>
            <font color="#29c8ec">馆</font>
            writing by
            <a class="hh-footer-author" href="https://huanhuanss.com/resume/">呵呵洁</a>
            <a class="beian-ico" rel="nofollow" target="_blank" href="http://www.miibeian.gov.cn/" title="ICP备案号：滇ICP备14003762号">
                <img src="http://wyjloveyl.com/hhImages/blog/icp.png" alt="码虫博物馆" />蜀ICP备18005378号
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods:{

        },
        mounted() {

        }
    }
</script>

<style scoped>
    .hh-footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
    }
    .hh-footer-main{
        padding: 10px 0;
        color: #000;
        vertical-align: middle;
    }
    .hh-footer-main a{
        color: #000;
        vertical-align: middle;
    }
    .hh-footer-main a img{
        vertical-align: middle;
        margin-right: 5px;
    }
    .hh-footer-main a.hh-footer-author{
        color: #00a67c;
        margin: 0 5px;
        vertical-align: middle;
    }
    @media only screen and (max-width : 767px){
        .hh-footer{
            background: rgba(238,238,238,0.1);
            font-size: 14px;
        }
        .hh-footer-author{
            color: #000;
        }
    }
</style>