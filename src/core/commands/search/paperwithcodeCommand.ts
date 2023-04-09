import { CommandType } from '../../command'

/* 
 paper with code搜索
*/
const githubCommand: CommandType = {
    command: 'papaerwithcode',
    alias: ['pwc'],
    name: 'paper with code 搜索',
    desc: 'paper with code 搜索',
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
            name: 'word',
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

        const targetLink = `https://paperswithcode.com/search?q=${query}`
        if (self) {
            window.location.href = targetLink
        } else {
            window.open(targetLink)
        }
    },
}

export default githubCommand
