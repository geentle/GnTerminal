const express = require('express')
const router = express.Router()

const bilibiliHandler = require('../handler/bilibiliHandler')

/* 
    获取随机热门视频
*/
router.get('/hot/list', bilibiliHandler.getBilibiliHotList)

module.exports = router
