import { CommandType } from '../../command'

/* 
 豆瓣搜索
*/
const wangyiyunCommand: CommandType = {
    command: 'wangyiyun',
    alias: ['wyy', 'music'],
    name: '网易云搜索',
    desc: '网易云搜索',
    options: [
        {
            name: 'self',
            desc: '是否当前页面打开',
            alias: ['s'],
            type: 'boolean',
            defaultValue: false,
        },
    ],
    args: [
        {
            name: 'query',
            desc: '搜索内容',
            required: true,
        },
    ],
    action(options, terminal) {
        const { _, self } = options
        let query = ''
        if (_.length > 0) {
            query = _.join(' ')
        }
        const targetLink = `https://music.163.com/#/search/m/?s=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default wangyiyunCommand
