import { ParsedOptions } from 'getopts'
import { CommandType } from '../../command'
/* 
    百度搜索命令
*/
const googleCommand: CommandType = {
    command: 'google',
    name: '谷歌搜索',
    desc: '取参数去进行谷歌搜索',
    // 选项 --self
    options: [
        {
            name: 'self',
            alias: ['s'],
            type: 'boolean',
            desc: '是否当前页面打开',
            defaultValue: false,
            required: false,
        },
        {
            name: 'picture',
            desc: '是否搜索图片',
            alias: ['p'],
            type: 'boolean',
            defaultValue: false,
            required: false,
        },
    ],
    // 参数
    args: [
        {
            name: 'query',
            desc: '搜索内容',
            required: true,
        },
    ],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: false,
}

function action(options: ParsedOptions, terminal: TerminalType): void {
    const { _, self, picture } = options
    let query = ''
    if (_.length > 0) {
        query = _.join(' ')
    }
    let targetLink = `https://www.google.com/search?q=${query}`
    // 搜索图片
    if (picture) {
        targetLink = `https://www.google.com/search?q=${query}&tbm=isch`
    }
    // 原地还是跳转
    if (self) {
        window.location.href = targetLink
    } else {
        window.open(targetLink)
    }
}

export default googleCommand
