const MyError = require('../exception')
const {
    REQUEST_PARAMS_ERROR_CODE,
    NO_AUTH_ERROR_CODE,
    FORBIDDEN_ERROR_CODE,
    SYSTEM_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
    THIRD_PART_SERVICE_ERROR_CODE,
} = require('../exception/errorCode')
const Favor = require('../models/favor')

// 同步当前用于 favor
exports.syncFavor = async (req, res, next) => {
    const { favorContent } = req.body
    if (!req.tokenData) {
        throw new MyError(NO_AUTH_ERROR_CODE, '未登录')
    }
    const { userId } = req.tokenData
    const favor = await getFavorContentByUserId(userId)
    // 如果不存在则创建
    if (!favor) {
        await Favor.create({
            userId,
            content: favorContent,
        })
    } else {
        // 存在则更新
        await Favor.update(
            { favor: favorContent },
            {
                where: {
                    userId,
                },
            }
        )
    }
    next(true)
}

// 获取当前用户 favor
exports.getFavorContent = async (req, res, next) => {
    if (!req.tokenData) {
        throw new MyError(NO_AUTH_ERROR_CODE, '未登录')
    }
    const userId = req.tokenData.userId
    const favor = await getFavorContentByUserId(userId)
    if (!favor) {
        throw new MyError(NOT_FOUND_ERROR_CODE, '没找到书签')
    }
    next(favor)
}

// 根据 userId 查找 favor
const getFavorContentByUserId = async (userId) => {
    try {
        // 根据 userId 找 favor
        let favorContent = await Favor.findOne({
            where: {
                userId,
            },
        })
        return favorContent
    } catch (err) {
        return null
    }
}
