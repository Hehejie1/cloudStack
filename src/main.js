// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/store'
import {VERSION, HTTP_BASE_URL} from './api/config'

// 引入css文件
import './assets/styles/index.css'
import './assets/styles/main.css'
import './assets/styles/style.css'
import '../static/util/js/Bubble'

// 禁止保存
window.addEventListener("keydown", function (e) {
  //可以判断是不是mac，如果是mac,ctrl变为花键
  //event.preventDefault() 方法阻止元素发生默认的行为。
  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    // Process event...
  }
}, false);


// 版权信息
window.mmPlayer = window.mmplayer = `欢迎来到 码虫博物馆！
当前版本为：V${VERSION}
作者：呵呵杰`;
// eslint-disable-next-line
console.info(`%c${window.mmplayer}`, `color:blue`);


// 做seo优化
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo);

// elementUI的配置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);


// jquery的配置
import $ from 'jquery'
Vue.prototype.$ = $;

// 请求的总体配置
import axios from 'axios'
axios.defaults.baseURL = HTTP_BASE_URL;
Vue.prototype.$axios = axios;


// 全局事件锁
Vue.prototype._lock = false;
// 全局图片地址
Vue.prototype.imgSrc = 'https://www.wyjloveyl.com/hhImages/blog/';
Vue.prototype.jumpTo = function (name, query) {
  if (query) {
    this.$router.push({
      name,
      query
    })
  } else {
    this.$router.push({
      name
    })
  }
};

Vue.config.productionTip = false;

// createApp(App).mount('#app',router,store);
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  render: h => h(App)
});



