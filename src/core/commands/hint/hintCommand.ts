import { ParsedOptions } from 'getopts'
import { useTerminalStore } from '../../../stores/terminalStore'
import { CommandType } from '../../command'
/* 
    百度搜索命令
*/
const hintCommand: CommandType = {
    command: 'hint',
    name: '提示控制',
    desc: '切换提示开启与关闭',
    // 选项
    options: [],
    // 参数
    args: [
        {
            name: 'switch',
            desc: 'on 开启提示 / off 关闭提示',
            required: false,
        },
    ],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: false,
}

function action(options: ParsedOptions, terminal: TerminalType): void {
    const { _ } = options
    const { setOrSwicthShowHint } = useTerminalStore()
    let showHint: boolean = false
    if (_.length === 0) {
        showHint = setOrSwicthShowHint()
    } else {
        showHint = setOrSwicthShowHint(_[0])
    }
    terminal.writeResult({
        type: 'text',
        text: `输入提示已${showHint ? '开启' : '关闭'}`,
        status: 'success',
    })
}

export default hintCommand
