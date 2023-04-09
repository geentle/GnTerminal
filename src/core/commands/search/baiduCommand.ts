import { ParsedOptions } from 'getopts'
import { CommandType } from '../../command'
/* 
    百度搜索命令
*/
const baiduCommand: CommandType = {
    command: 'baidu',
    name: '百度搜索',
    desc: '对输入内容进行百度搜索',
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
    let targetLink = `https://www.baidu.com/s?wd=${query}`
    // 搜索图片
    if (picture) {
        targetLink = `https://image.baidu.com/search/index?tn=baiduimage&word=${query}`
    }
    // 原地还是跳转
    if (self) {
        window.location.href = targetLink
    } else {
        window.open(targetLink)
    }
}

export default baiduCommand
