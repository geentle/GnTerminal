const express = require('express')
const router = express.Router()
const backgroundHandler = require('../handler/backgroundHandler')

/* 
    获取 bing 随机壁纸
*/
router.get('/random', backgroundHandler.getRandomBackground)

module.exports = router
