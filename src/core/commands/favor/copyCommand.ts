import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'

/* 
    复制书签命令
*/
const copyCommand: CommandType = {
    command: 'copy',
    name: '复制书签',
    desc: '复制书签',
    alias: ['cp'],
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
        terminal.writeTextErrorResult('缺少参数或命令格式有误')
        return
    }
    if (!_[0] || !_[1]) {
        terminal.writeTextErrorResult('缺少参数或命令格式有误')
        return
    }
    const favorStore = useFavorStore()
    const result = favorStore.copyItem(_[0], _[1], recursive)
    if (result) {
        terminal.writeTextSuccessResult('复制成功')
    } else {
        terminal.writeTextErrorResult('复制失败')
    }
}
export default copyCommand
