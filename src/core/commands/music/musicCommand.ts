import { CommandType } from '../../command'
import { defineAsyncComponent, markRaw } from 'vue'
import CommandOutputType = GnTerminal.CommandOutputType
import { ParsedOptions } from 'getopts'

/* 
    听音乐命令
*/
const musicCommand: CommandType = {
    command: 'music',
    name: '音乐',
    desc: '在线听音乐，网易云音乐',
    args: [
        {
            name: 'keywords',
            desc: '关键词',
            required: true,
        },
    ],
    options: [],
    collapsible: true,
    action(options: ParsedOptions, terminal: TerminalType) {
        const { _ } = options
        let query = ''
        if (_.length > 0) {
            query = _.join(' ')
        }
        if (_.length < 1) {
            terminal.writeTextErrorResult('参数不足')
            return
        }
        // const name = _[0]

        terminal.loadingAsyncComponentSwitch(true)
        const output: CommandOutputType = {
            type: 'component',
            component: markRaw(
                defineAsyncComponent(() => import('./components/MusicBox.vue'))
            ),
            props: {
                query,
            },
        }
        terminal.writeResult(output)
    },
}

export default musicCommand
