import request from '@/utils/request'

/* 
    根据关键词获得一首音乐（网易云音乐）
*/
const getSingleMusic = (keywords: string) => {
    if (!keywords) {
        return null
    }
    return request.get('/music/get', {
        params: {
            keywords: keywords,
        },
    })
}

/* 
    获取网易云音乐热榜
*/
const listHotMusics = () => {
    return request.get('/music/list/hot')
}

export { getSingleMusic, listHotMusics }
