const axios = require('axios')

/* 
    bilibili 热榜
*/
async function getBilibiliHotListAPI() {
    const api = 'https://api.bilibili.com/x/web-interface/popular'
    let hotList
    await axios.get(api).then((res) => {
        hotList = res.data
    })
    return hotList
}

module.exports = {
    getBilibiliHotListAPI,
}
