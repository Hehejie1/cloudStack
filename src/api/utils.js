import axios from 'axios'

// 获取动物的识别列表
export function getIdentifyAnimals(animal) {
    return axios.get('https://reptile.akeyn.com/image/animal?url=' + animal)
}


// 排行榜详情
export function topList(idx) {
    return axios.post('/top/list', {
        params: {
            idx
        }
    })
}