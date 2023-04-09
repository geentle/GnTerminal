/* 
    user handler 
*/
const { generateToken } = require('../utils/jwtUtils')
const MyError = require('../exception')
const {
    REQUEST_PARAMS_ERROR_CODE,
    NO_AUTH_ERROR_CODE,
    FORBIDDEN_ERROR_CODE,
    SYSTEM_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
    THIRD_PART_SERVICE_ERROR_CODE,
} = require('../exception/errorCode')
const { Op } = require('sequelize')
const User = require('../models/user')
const md5 = require('md5')
// 密码加盐
const SALT = 'geentle'

/* 
    register 
*/
exports.userRegister = async (req, res, next) => {
    const { username, password, email } = req.body
    // 校验
    if (!username || !password || !email) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, '参数错误')
    }
    // 用户名长度限制
    if (username > 32) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, '用户名过长')
    }
    // 正则校验邮箱
    const regEmail =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!regEmail.test(email)) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, '邮箱非法')
    }
    // 用户是否已存在
    let user = await User.findOne({
        where: {
            [Op.or]: [{ username }, { email }],
            isDelete: 0,
        },
    })
    if (user) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, '该用户名或邮箱已被注册')
    }
    // 插入新用户
    const cryptoPassword = md5(password + SALT)
    user = await User.create({
        username,
        password: cryptoPassword,
        email,
    })

    // return data
    next({
        user_id: user.id,
        token: generateToken(user.id),
    })
}

/* 
    login
*/
exports.userLogin = async (req, res, next) => {
    // 校验
    const { username, password } = req.query
    if (!username || !password) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, '参数错误')
    }
    const cryptoPassword = md5(password + SALT)
    // 用户是否已存在 不把密码查出来
    let user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            username,
            password: cryptoPassword,
        },
    })
    if (!user) {
        throw new MyError(NOT_FOUND_ERROR_CODE, '用户不存在或密码错误')
    }
    // 登录成功
    const token = generateToken(user.id)
    next({
        user,
        token,
    })
}

/* 
    logout
*/
exports.userLogout = async (req, res, next) => {
    next(true)
}

/* 
    get current logined user
*/
exports.getLoginUser = async (req, res, next) => {
    if (!req.tokenData) {
        throw new MyError(NO_AUTH_ERROR_CODE, '未登录')
    }
    // 获取当前登录用户
    const { userId } = req.tokenData
    // 根据 username 查找用户
    const currentUser = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: userId,
        },
    })
    // 检查用户是否合法
    if (!currentUser) {
        throw new MyError(NOT_FOUND_ERROR_CODE, '找不到该用户')
    }
    next(currentUser)
}
