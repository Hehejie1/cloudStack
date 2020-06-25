<template>
    <div class="hh">
        <router-view/>
        <LodgeHeadNav></LodgeHeadNav>
        <Footer></Footer>
        <Share></Share>
        <Slide></Slide>
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
    @media only screen and (max-width : 767px){

    }
</style>