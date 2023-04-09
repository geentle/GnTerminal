import { CommandType } from '../../command'

/* 
 github搜索
*/
const githubCommand: CommandType = {
    command: 'github',
    name: 'github搜素',
    desc: 'github搜素',
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
        const targetLink = `https://github.com/search?q=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default githubCommand
