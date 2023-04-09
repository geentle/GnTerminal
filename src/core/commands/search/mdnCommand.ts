import { CommandType } from '../../command'

/* 
 MDN搜索
*/
const mdnCommand: CommandType = {
    command: 'mdn',
    name: 'MDN搜索',
    desc: 'MDN搜索',
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
        const targetLink = `https://developer.mozilla.org/zh-CN/search?q=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default mdnCommand
