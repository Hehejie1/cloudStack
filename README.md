# 码虫小屋（cloudstack）

> 码虫小屋致力于打造云开发合作生态圈，让不同地域的开发者都能在云端进行团队开发，大家进行交流学习，共同成长

# 项目架构
```
├─build                              // webpack配置 
│  │             
├─config                            //配置目录，包括端口号
│    
├─node_modules                       //npm加载的项目依赖模块   
└─src                               // 开发目录
    │  App.vue                       // 根组件
    │  main.js                       // 程序入口文件
    ├─api                           //存放所有的接口内容
    ├─assets                        // 存放一些图片
    │   
    ├─components                    // 公共组件库
    │
    │
    ├─router
    │      index.js                   // 单页面路由注册组件
    ├─store
    │      index.js                   // 状态管理仓库未使用到
    └─views
            Home.vue                  // 全局配置页面
            index.vue                 // 首页界面
```


# 技术栈
 * vue2.5.2
 * axios
 * element-ui
 * webpack
 * ES6
 * less
 * vue-meta-info
 * css3
 * jquery
 * iconfont
 * vuex
 
 
# 功能模块
* 用户登录
* 想法模块
* 团队模块


## 下载安装依赖
```
git clone https://github.com/jackchen0120/vueDataV.git
cd vueDataV
npm install 或 yarn
```
## 开发模式
```
npm run serve
```
运行之后，访问地址：http://localhost:8081

## 生产环境打包
```
npm run build
```
