import { ParsedOptions } from 'getopts'
import { useFavorStore } from '../../../stores/favorStore'
import { CommandType } from '../../command'
import { syncFavor } from '@/api/favor'

/* 
    同步书签命令
*/
const uploadFavorCommand: CommandType = {
    command: 'uploadfavor',
    name: '上传书签',
    desc: '同步书签到服务器',
    alias: ['upload'],
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
    const favor = favorStore.favor
    try {
        await syncFavor(JSON.stringify(favor))
        terminal.writeTextSuccessResult('同步书签到服务器成功')
        return
    } catch (err) {
        terminal.writeTextErrorResult('同步书签到服务器失败：' + err)
    }
}

export default uploadFavorCommand
