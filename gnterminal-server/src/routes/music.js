const express = require('express')
const router = express.Router()
const musicHandler = require('../handler/musicHandler')

/* 
    获取一首音乐
*/
router.get('/get', musicHandler.getOneMusic)

/* 
    获取热歌榜
*/
router.get('/list/hot', musicHandler.getHotList)

module.exports = router
