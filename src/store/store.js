import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
        userInfo : null,
        ideaInfo : null,
    },
    // 不允许异步进行调用
    mutations:{
        // 保存用户的个人信息
        setUser : (state, userInfo) => {
            state.userInfo = userInfo;
            sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
        },
        // 删除个人信息
        delUser:(state) => {
            state.userInfo = null;
            sessionStorage.removeItem('userInfo');
        },
        // 设置团队信息
        setIdea:(state,ideaInfo) => {
            state.ideaInfo = ideaInfo;
            sessionStorage.setItem('ideaInfo',JSON.stringify(ideaInfo));
        },
    },
    // 异步进行调用
    actions:{

    },
    getters : {
        userInfo(state){
            if (!state.userInfo){
                state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            }
            return state.userInfo;
        },
        isLogin(state){
            if (!state.userInfo){
                state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            }
            if (state.userInfo){
                return true;
            } else{
                return false;
            }
        },
        // 获取团队信息
        getIdea:(state) => {
            if (!state.ideaInfo){
                state.ideaInfo = JSON.parse(sessionStorage.getItem('ideaInfo'))
            }
            return state.ideaInfo;
        },
    }

});

export default store