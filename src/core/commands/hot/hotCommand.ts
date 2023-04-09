import { CommandType } from '../../command'
import { defineAsyncComponent, markRaw } from 'vue'
import CommandOutputType = GnTerminal.CommandOutputType
import { ParsedOptions } from 'getopts'

/**
 * 热榜命令
 */
const hotCommand: CommandType = {
    command: 'hot',
    name: '热榜',
    desc: '查看网易云音乐热榜',
    alias: [],
    options: [],
    args: [
        // {
        //     name: '热榜类别',
        //     desc: '要查询的热榜',
        //     required: false,
        // },
    ],
    collapsible: true,
    async action(options: ParsedOptions, terminal: TerminalType) {
        terminal.loadingAsyncComponentSwitch(true)
        const output: CommandOutputType = {
            type: 'component',
            component: markRaw(
                defineAsyncComponent(
                    () => import('./components/HotMusicBox.vue')
                )
            ),
            props: {},
        }
        terminal.writeResult(output)
    },
}

export default hotCommand
