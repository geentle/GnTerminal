const MyError = require('../exception')
const {
    REQUEST_PARAMS_ERROR_CODE,
    NO_AUTH_ERROR_CODE,
    FORBIDDEN_ERROR_CODE,
    SYSTEM_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
    THIRD_PART_SERVICE_ERROR_CODE,
} = require('../exception/errorCode')
const { getBilibiliHotListAPI } = require('../thirdpart/bilibiliAPI')

exports.getBilibiliHotList = async (req, res, next) => {
    try {
        const hotList = await getBilibiliHotListAPI()
        next(hotList.data)
    } catch (err) {
        throw new MyError(
            THIRD_PART_SERVICE_ERROR_CODE,
            'bilibili API 请求失败'
        )
    }
}
