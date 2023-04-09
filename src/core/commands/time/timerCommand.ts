import { CommandType } from '../../command'
import { defineAsyncComponent, markRaw } from 'vue'
import CommandOutputType = GnTerminal.CommandOutputType

const timerCommand: CommandType = {
    command: 'timer',
    name: '定时器',
    desc: '开启一个定时器，倒计时指定的秒数',
    options: [
        {
            name: 'seconds',
            desc: '秒数',
            alias: ['s'],
            type: 'string',
            required: true,
        },
    ],
    action(options, terminal) {
        const { _, seconds } = options
        if (!seconds) {
            terminal.writeTextErrorResult('参数不足')
            return
        }
        // 开启 异步组件 loading
        terminal.loadingAsyncComponentSwitch(true)
        const output: CommandOutputType = {
            type: 'component',
            component: markRaw(
                defineAsyncComponent(() => import('./components/TimerBox.vue'))
            ),
            props: {
                seconds,
            },
        }
        terminal.writeResult(output)
    },
}

export default timerCommand
