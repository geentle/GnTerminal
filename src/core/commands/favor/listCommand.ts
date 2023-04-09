import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'
/* 
    ls命令
*/
const listCommand: CommandType = {
    command: 'list',
    name: '当前目录文件和文件夹',
    desc: '查看当前目录文件和文件夹',
    alias: ['ls'],
    options: [],
    // 参数
    args: [],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: false,
}
function action(options: ParsedOptions, terminal: TerminalType) {
    const favorStore = useFavorStore()
    let list = favorStore.listCurDir()
    terminal.writeTextResult(`当前所在目录: ${favorStore.currentDir}`)
    list.forEach((value) => {
        if (value.dir !== value.name) {
            let output = `${value.name} ${value.link}`
            if (value.type === 'dir') {
                output = `<span style="color: lawngreen">${value.name}</span>`
            }
            terminal.writeTextResult(output)
        }
    })
}

export default listCommand
