import axios from 'axios'

import {HTTP_BASE_URL} from './config'
axios.defaults.baseURL = HTTP_BASE_URL;

// 码虫小屋
// 保存团队
export function saveTeam(team) {
    return axios.post('/saveTeam', team)
}
// 获取团队
export function getTeam(team) {
    return axios.post('/getTeam', team)
}
// 加入团队
export function addTeam(team) {
    return axios.post('/addTeam', team)
}
// 修改团队资料
export function updateTeam(team) {
    return axios.post('/updateTeam', team)
}
// 获取模型
export function getModel(team) {
    return axios.post('/getModel', team)
}
// 获取团队成员
export function getTeamUser(team) {
    return axios.post('/getTeamUser', team)
}
// 修改队员状态
export function updateTeamUser(team) {
    return axios.post('/updateTeamUser', team)
}
// 发布想法
export function saveCreativity(team) {
    return axios.post('/saveCreativity', team)
}
// 获取想法
export function getCreativity(team) {
    return axios.post('/getCreativity', team)
}
// 删除团队
export function deleteTeam(team) {
    return axios.post('/deleteTeam', team)
}

