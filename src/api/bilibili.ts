import request from '@/utils/request'

/* 
    获取b站热门视频列表
    api 来源于 https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/video_ranking/popular.md#%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E7%83%AD%E9%97%A8%E8%A7%86%E9%A2%91%E5%88%97%E8%A1%A8
*/
const getBilibiliHotList = () => {
    return request.get('/bilibili/hot/list')
}

export { getBilibiliHotList }
