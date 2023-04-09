import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'

/* 
    删除书签命令
*/
const removeCommand: CommandType = {
    command: 'remove',
    name: '删除书签',
    desc: '删除书签',
    alias: ['rm'],
    options: [
        {
            name: 'recursive',
            alias: ['r'],
            type: 'boolean',
            desc: '是否递归删除',
            required: false,
        },
    ],
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
    const { _, recursive } = options
    if (_.length < 1) {
        terminal.writeTextErrorResult('参数不足')
        return
    }
    const favorStore = useFavorStore()
    const result = favorStore.deleteItem(_[0], recursive)
    if (result) {
        terminal.writeTextSuccessResult('删除成功')
    } else {
        terminal.writeTextErrorResult('删除失败')
    }
}
export default removeCommand
