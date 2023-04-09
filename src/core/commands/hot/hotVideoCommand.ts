import { CommandType } from '../../command'
import { defineAsyncComponent, markRaw } from 'vue'
import CommandOutputType = GnTerminal.CommandOutputType
import { ParsedOptions } from 'getopts'
import { getBilibiliHotList } from '@/api/bilibili'

/**
 * 随机bilibili热榜视频命令
 */
const hotVideoCommand: CommandType = {
    command: 'hotvideo',
    name: '热榜',
    desc: '随机bilibili热榜视频',
    alias: ['video'],
    options: [],
    args: [],
    collapsible: true,
    async action(options: ParsedOptions, terminal: TerminalType) {
        try {
            const res = await getBilibiliHotList()
            const hotList = res.data.list
            if (hotList.length <= 0) {
                terminal.writeTextErrorResult('获取热门视频出现异常')
                return
            }

            // 开始加载组件
            terminal.loadingAsyncComponentSwitch(true)
            const output: CommandOutputType = {
                type: 'component',
                component: markRaw(
                    defineAsyncComponent(
                        () => import('./components/BilibiliBox.vue')
                    )
                ),
                props: {
                    hotList,
                },
            }
            terminal.writeResult(output)
        } catch (err) {
            terminal.writeTextErrorResult('处理请求失败:' + err)
        }
    },
}

export default hotVideoCommand
