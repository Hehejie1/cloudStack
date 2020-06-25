import Vue from 'vue'
import Router from 'vue-router'


const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}

// 码虫小屋
const lodgeHoom = ()=>import('../views/hoom');
const lodgeIndex = ()=>import('../views/index');
const lodgeIdea = ()=>import('../views/idea');
const lodgeTeam = ()=>import('../views/team');
const lodgeTeamDetail = ()=>import('../views/teamDetail');
const lodgeCode = ()=>import('../views/code');
const lodgeFile = ()=>import('../views/file');
const lodgeMember = ()=>import('../views/member');
const lodgeTask = ()=>import('../views/task');
const lodgeModel = ()=>import('../views/model');
const lodgeAddTeam = ()=>import('../views/addTeam');


// 组件库
const Footer = ()=>import('../components/base_footer');
const Share = ()=>import('../components/base_share');
Vue.component("Footer",Footer);
Vue.component("Share",Share);
// 码虫工厂
const LodgeHeadNav = ()=>import('../components/headNav');
const LodgeIdeaItem = ()=>import('../components/ideaItem');
const LodgeTeamItem = ()=>import('../components/teamItem');
Vue.component("LodgeHeadNav",LodgeHeadNav);
Vue.component("LodgeIdeaItem",LodgeIdeaItem);
Vue.component("LodgeTeamItem",LodgeTeamItem);


Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            redirect : {"name" : "lodgeIndex"}
        },
        // 码虫工厂
        {
            path: '/lodge',
            component: lodgeHoom,
            children: [
                {
                    path: '/',
                    redirect : {"name" : "lodgeIndex"}
                },
                {
                    path: 'index.html',
                    name: 'lodgeIndex',
                    component: lodgeIndex
                },
                {
                    path: 'idea.html',
                    name: 'lodgeIdea',
                    component: lodgeIdea
                },
                {
                    path: 'team.html',
                    name: 'lodgeTeam',
                    component: lodgeTeam
                },
                {
                    path: 'teamDetail.html',
                    name: 'lodgeTeamDetail',
                    component: lodgeTeamDetail
                },
                {
                    path: 'code.html',
                    name: 'lodgeCode',
                    component: lodgeCode
                },
                {
                    path: 'file.html',
                    name: 'lodgeFile',
                    component: lodgeFile
                },{
                    path: 'member.html',
                    name: 'lodgeMember',
                    component: lodgeMember
                },{
                    path: 'task.html',
                    name: 'lodgeTask',
                    component: lodgeTask
                },{
                    path: 'model.html',
                    name: 'lodgeModel',
                    component: lodgeModel
                },{
                    path: 'addTeam.html',
                    name: 'lodgeAddTeam',
                    component: lodgeAddTeam
                }
            ]
        },
        {
            path: '*',
            redirect : {"name" : "error"}
        }
    ]
})
