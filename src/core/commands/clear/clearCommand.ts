import { ParsedOptions } from 'getopts'
import { CommandType } from '../../command'

/* 
    清屏命令
*/
const clearCommand: CommandType = {
    command: 'clear',
    name: '清屏',
    desc: '清屏',
    options: [],
    // 参数
    args: [],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: false,
}

function action(options: ParsedOptions, terminal: TerminalType): void {
    // 延时清屏
    setTimeout(terminal.clear, 0)
}

export default clearCommand
