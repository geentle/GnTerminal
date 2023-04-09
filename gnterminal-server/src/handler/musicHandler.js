const MyError = require('../exception')
const {
    REQUEST_PARAMS_ERROR_CODE,
    NOT_FOUND_ERROR_CODE,
} = require('../exception/errorCode')

// 第三方 网易云音乐
const { searchMusics, playlistDetail } = require('../thirdpart/neteaseMusicAPI')

/* 
    获取一首音乐
*/
exports.getOneMusic = async (req, res, next) => {
    const { keywords } = req.query
    if (!keywords) {
        throw new MyError(REQUEST_PARAMS_ERROR_CODE, '未输入关键词')
    }
    // 查询音乐
    const songs = await searchMusics(keywords, 1)
    if (songs.length < 1) {
        throw new MyError(NOT_FOUND_ERROR_CODE, '没找到歌曲')
    }
    // 取第一首
    const song = songs[0]
    next({
        name: song.name,
        id: song.id,
    })
}

/* 
    获取歌单(热歌榜)详情
*/
exports.getHotList = async (req, res, next) => {
    const songs = await playlistDetail()
    if (!songs) {
        throw new MyError(NOT_FOUND_ERROR_CODE)
    }
    next(songs)
}
