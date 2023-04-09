import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'

/* 
    新建文件夹命令
*/
const mkdirCommand: CommandType = {
    command: 'mkdir',
    name: '新建文件夹',
    desc: '新建文件夹',
    options: [],
    // 参数
    args: [
        {
            name: 'dir',
            desc: '文件夹名字',
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
    if (_.length <= 0) {
        terminal.writeTextErrorResult('缺少文件夹名')
        return
    }
    if (_[0] == '') {
        terminal.writeTextErrorResult('缺少文件夹名')
        return
    }
    const item: FavorItemType = {
        name: _[0],
        dir: favorStore.currentDir,
        type: 'dir',
    }
    const result = favorStore.addItem(item)
    if (result) {
        terminal.writeTextSuccessResult('新建文件夹成功')
    } else {
        terminal.writeTextErrorResult('目录已存在')
    }
}

export default mkdirCommand
