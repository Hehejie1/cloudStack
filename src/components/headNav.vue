<template>
    <div class="hh-lodge-header" @click="jumpTo">
        码虫小屋
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            jumpTo(){
                this.$router.push({
                    name : 'lodgeIndex'
                })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .hh-lodge-header{
        width: 100%;
        padding: 20px 0;
        text-align: center;
        cursor: pointer;
    }
    @media only screen and (max-width : 767px){

    }
</style>