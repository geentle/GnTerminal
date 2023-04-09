import { CommandType } from '../../command'

/* 
 必应搜索
*/
const bingCommand: CommandType = {
    command: 'bing',
    name: '必应搜索',
    desc: '必应搜索',
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
        const targetLink = `https://www.bing.com/search?q=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default bingCommand
