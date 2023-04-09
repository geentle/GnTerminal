import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'

/* 
    移动命令
*/
const moveCommand: CommandType = {
    command: 'move',
    name: '移动书签',
    desc: '移动书签',
    alias: ['mv'],
    options: [
        {
            name: 'recursive',
            alias: ['r'],
            type: 'boolean',
            desc: '是否递归复制',
            required: false,
        },
    ],
    // 参数
    args: [
        {
            name: 'source',
            desc: '源文件',
            required: true,
        },
        {
            name: 'target',
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
    if (_.length < 2) {
        terminal.writeTextErrorResult('缺少参数')
        return
    }
    const favorStore = useFavorStore()
    const result = favorStore.moveItem(_[0], _[1], recursive)
    if (result) {
        terminal.writeTextSuccessResult('移动成功')
    } else {
        terminal.writeTextErrorResult('移动失败')
    }
}
export default moveCommand
