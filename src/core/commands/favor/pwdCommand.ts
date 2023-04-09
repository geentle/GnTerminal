import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'

/* 
    pwd 命令
*/
const pwdCommand: CommandType = {
    command: 'pwd',
    name: '查看当前目录',
    desc: '查看当前目录',
    options: [],
    // 参数
    args: [],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: false,
}

function action(options: ParsedOptions, terminal: TerminalType): void {
    const favorStore = useFavorStore()
    terminal.writeTextResult(`当前所在目录：${favorStore.currentDir}`)
}

export default pwdCommand
