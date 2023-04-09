import request from '../utils/request'

/* 
    get Bing 随机壁纸
*/
export const getBingRandomBackground = async () => {
    return await request.get('/bg/random')
}
