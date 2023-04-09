import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'
import { getServerFavor } from '@/api/favor'

/* 
    同步服务器书签到本地
*/
const downloadFavorCommand: CommandType = {
    command: 'downloadfavor',
    name: '下载书签',
    desc: '同步服务器书签到本地',
    alias: ['download'],
    options: [],
    // 参数
    args: [],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: false,
}

async function action(options: ParsedOptions, terminal: TerminalType) {
    const favorStore = useFavorStore()
    try {
        const res = await getServerFavor()
        const favorContent = res.data.content
        if (!favorContent) {
            terminal.writeTextErrorResult('服务器不存在书签')
            return
        }
        const serveFavorObj = JSON.parse(favorContent)
        favorStore.setFavor(serveFavorObj)
        terminal.writeTextSuccessResult('同步服务器书签到本地成功')
    } catch (err) {
        terminal.writeTextErrorResult('同步服务器书签到本地失败:' + err)
    }
}

export default downloadFavorCommand
