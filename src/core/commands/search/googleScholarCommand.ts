import { CommandType } from '../../command'

/* 
 谷歌学术搜索
*/
const googleScholarCommand: CommandType = {
    command: 'googlescholar',
    alias: ['gs'],
    name: '谷歌学术搜索',
    desc: '谷歌学术搜索',
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
        const targetLink = `https://developer.baidu.com/search.html?keyword=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default googleScholarCommand
