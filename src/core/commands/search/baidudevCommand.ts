import { CommandType } from '../../command'

/* 
 必应搜索
*/
const baidudevCommand: CommandType = {
    command: 'baidudev',
    name: '百度开发者搜索',
    desc: '百度开发者搜索',
    alias: ['dev'],
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
        const targetLink = `https://kaifa.baidu.com/searchPage?wd=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default baidudevCommand
