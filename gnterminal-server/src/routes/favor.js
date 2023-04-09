const express = require('express')
const router = express.Router()

const favorHandler = require('../handler/favorHandler')

/* 
    同步 favor
*/
router.post('/sync', favorHandler.syncFavor)

/* 
    获取 favor
*/
router.get('/get', favorHandler.getFavorContent)

module.exports = router
