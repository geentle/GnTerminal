const express = require('express')
const router = express.Router()
const userHandler = require('../handler/userHandler')

/* 
    用户注册
*/
router.post('/register', userHandler.userRegister)

/* 
    用户登录
*/
router.get('/login', userHandler.userLogin)

/* 
    用户登出
*/
router.get('/logout', userHandler.userLogout)

/* 
    获取现在登录着的用户
*/
router.get('/current', userHandler.getLoginUser)

module.exports = router
