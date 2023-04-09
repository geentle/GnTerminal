import { ParsedOptions } from 'getopts'
import { CommandType } from '../../command'
import CommandOutputType = GnTerminal.CommandOutputType
import { defineAsyncComponent, markRaw } from 'vue'
import { commandMap } from '../../commandRegister'

/* 
    帮助命令
    无参数 => 固定展示的帮助内容
    有参数 (命令名) => 根据命令名展示特定的帮助内容
*/
const helpCommand: CommandType = {
    command: 'help',
    name: '帮助',
    desc: '帮助',
    alias: [],
    options: [],
    // 参数
    args: [
        {
            name: 'commandName',
            desc: '命令名',
        },
    ],
    // 功能
    action: action,
    // 结果是否允许折叠
    collapsible: true,
}
async function action(options: ParsedOptions, terminal: TerminalType) {
    const { _ } = options

    if (_.length < 1) {
        // 没传命令名

        // 开启 加载动画
        terminal.loadingAsyncComponentSwitch(true)
        const output: CommandOutputType = {
            type: 'component',
            component: markRaw(
                defineAsyncComponent(() => import('./componets/HelpBox.vue'))
            ), // markRaw 去除响应式
            // defineAsyncComponent 定义一个异步组件，它在运行时是懒加载的。
            // 异步加载组件
        }
        terminal.writeResult(output)
    } else {
        // 传了命令名
        const commandName = _[0]
        const command = commandMap.get(commandName)
        if (!command) {
            // 不存在命令
            terminal.writeTextErrorResult(
                `不存在命令 '${commandName}'，无法查看 '${commandName}' 的帮助`
            )
            return
        }
        // 开启 加载动画
        terminal.loadingAsyncComponentSwitch(true)
        const output: CommandOutputType = {
            type: 'component',
            component: markRaw(
                defineAsyncComponent(
                    () => import('./componets/CommandHelpBox.vue')
                )
            ),
            props: {
                command,
            },
        }
        terminal.writeResult(output)
    }
}

export default helpCommand
