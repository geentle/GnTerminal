import { CommandType } from '../../command'

/* 
 stackoverflow搜索
*/
const stackoverflowCommand: CommandType = {
    command: 'stackoverflow',
    alias: ['sof'],
    name: 'stackoverflow 搜索',
    desc: 'stackoverflow 搜索',
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
            desc: '搜索问题',
            required: true,
        },
    ],
    action(options, terminal) {
        const { _, self } = options
        let query = ''
        if (_.length > 0) {
            query = _.join(' ')
        }

        const targetLink = `https://stackoverflow.com/search?q=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default stackoverflowCommand
