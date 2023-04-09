import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'

/* 
    cd命令
*/
const cdCommand: CommandType = {
    command: 'cd',
    name: '移动',
    desc: '移动到指定目录',
    options: [],
    // 参数
    args: [
        {
            name: 'destination',
            desc: '目标目录',
            required: true,
        },
    ],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: false,
}

function action(options: ParsedOptions, terminal: TerminalType): void {
    let { _ } = options
    const favorStore = useFavorStore()
    if (_.length < 1) {
        terminal.writeTextErrorResult('缺少目标目录')
        return
    }
    if (_[0] === '..') {
        const result = favorStore.backCurDir()
        terminal.writeResult(result)
    } else {
        const result = favorStore.gotoDir(_[0])
        if (result === 'success') {
            terminal.writeTextResult(favorStore.currentDir)
        } else {
            terminal.writeTextErrorResult(result)
        }
    }
}

export default cdCommand
