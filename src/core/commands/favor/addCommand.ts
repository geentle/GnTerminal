import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'

/* 
    增加书签命令
*/
const addCommand: CommandType = {
    command: 'add',
    name: '添加到收藏',
    desc: '增加书签',
    options: [
        {
            name: 'name',
            desc: '书签名称',
            alias: ['n'],
            type: 'string',
            required: true,
        },
        {
            name: 'link',
            desc: '链接',
            alias: ['l'],
            type: 'string',
            required: true,
        },
        {
            name: 'dir',
            desc: '目标目录',
            alias: ['d'],
            type: 'string',
            required: false,
        },
    ],
    // 参数
    args: [],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: false,
}

function action(options: ParsedOptions, terminal: TerminalType): void {
    let { _, name, link, destination } = options
    const favorStore = useFavorStore()
    if (!destination) {
        destination = favorStore.currentDir
    }
    if (!name) {
        terminal.writeTextErrorResult('缺少书签名')
        return
    }
    if (!link) {
        terminal.writeTextErrorResult('缺少网址')
        return
    }
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
        link = 'http://' + link
    }
    const item: FavorItemType = {
        dir: destination,
        link,
        name,
        type: 'link',
    }
    console.log(item)
    const result = favorStore.addItem(item)
    if (result) {
        terminal.writeTextSuccessResult('添加书签成功')
    } else {
        terminal.writeTextErrorResult('书签名已存在')
    }
}

export default addCommand
