const MyError = require('../exception')
const { THIRD_PART_SERVICE_ERROR_CODE } = require('../exception/errorCode')
const { getRandomBackground } = require('../thirdpart/bingBackgroundAPI')

/* 
    获取 bing 随机壁纸
*/
exports.getRandomBackground = async (req, res, next) => {
    const url = await getRandomBackground()
    if (!url) {
        throw new MyError(
            THIRD_PART_SERVICE_ERROR_CODE,
            'Bing Random Background API Error'
        )
    }
    next({
        url,
    })
}
