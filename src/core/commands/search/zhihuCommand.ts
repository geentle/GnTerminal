import { CommandType } from '../../command'

/* 
 知乎搜索
*/
const zhihuCommand: CommandType = {
    command: 'zhihu',
    alias: ['zh'],
    name: '知乎搜索',
    desc: '知乎搜索',
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
        const targetLink = `https://www.zhihu.com/search?q=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default zhihuCommand
