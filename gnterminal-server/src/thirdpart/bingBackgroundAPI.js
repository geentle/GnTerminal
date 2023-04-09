const axios = require('axios')

/* 
    bing 壁纸
*/
async function getRandomBackground() {
    const api = 'https://api.asilu.com/bg/'
    let url = ''
    await axios.get(api).then((res) => {
        const images = res.data['images']
        const randomIndex = Math.floor(Math.random() * images.length)
        url = images[randomIndex]['url']
    })
    return url
}

module.exports = {
    getRandomBackground,
}
