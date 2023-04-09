import { ParsedOptions } from 'getopts'
import { CommandType } from '../../command'

/* 
    百度搜索命令
*/
const historyCommand: CommandType = {
    command: 'history',
    name: '历史命令',
    desc: '查看历史命令',
    options: [],
    // 参数
    args: [],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: true,
}

function action(options: ParsedOptions, terminal: TerminalType): void {
    const list = terminal.getAllCommandHistory()
    if (list.length === 0) {
        terminal.writeTextResult('还没有历史命令', 'warning')
        return
    }
    list.forEach((value, index) => {
        terminal.writeTextResult(`${index + 1}  ${value.text}`)
    })
}

export default historyCommand
