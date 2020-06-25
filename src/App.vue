<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="isRouterAlive" />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      isRouterAlive : true
    }
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  methods : {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },
  created() {
    // 设置title
    let OriginTitile = document.title;
    let titleTime;
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        document.title = '你不理可爱的码虫了吗？';
        clearTimeout(titleTime)
      } else {
        document.title = '欢迎回来码虫博物馆^__^!';
        titleTime = setTimeout(function () {
          document.title = OriginTitile;
        }, 2000)
      }
    })
  }
}
</script>
