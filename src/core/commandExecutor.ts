import { CommandOptionsType, CommandType } from './command'
import getopts, { ParsedOptions } from 'getopts'
import { commandMap } from './commandRegister'
// 解析命令 执行命令
const executeCommand = async function (
    commandStr: string,
    terminal: TerminalType
) {
    // 去除 命令 首尾的空格
    commandStr.trim()
    if (!commandStr) {
        // 命令为空，不做处理
        return
    }
    // 获取命令
    const command = getCommand(commandStr)
    if (!command) {
        terminal.writeTextResult(`命令 '${commandStr}' 不存在`, 'error')
        return
    }
    console.log('command name is ', command.name)
    // 解析命令参数
    const optsAndArgs = parseOptsAndArgs(commandStr, command.options)
    console.log('parse args and options => ', optsAndArgs)
    // 执行操作
    await doAction(command, optsAndArgs, terminal)
}

// 获取命令
const getCommand = function (commandStr: string): CommandType | undefined {
    let commandKey: string = commandStr.split(' ', 1)[0]
    // 大小写无关
    commandKey = commandKey.toLowerCase()

    // 存在这条命令
    if (commandMap.has(commandKey)) {
        return commandMap.get(commandKey)
    }
    // 不存在的命令返回 undefined
    return undefined
}

// 解析命令参数
const parseOptsAndArgs = function (
    commandStr: string,
    commandOptions?: CommandOptionsType[]
): ParsedOptions {
    // 去掉命令名，取剩下的参数字符串
    let commandOptsAndArgsStr: string[] = commandStr.split(' ').slice(1)
    // 根据 getopts 的 API，做一个匹配器，用于后面的解析
    let optionsFilter: Record<string, any> = {
        alias: {},
        boolean: [],
        string: [],
        default: {},
    }
    // 如果没有 options 就不做匹配器
    if (commandOptions) {
        // 遍历 当前命令的 options 做匹配器
        commandOptions.forEach((commandOption: CommandOptionsType) => {
            let { alias, defaultValue, name, type } = commandOption
            // 处理 alias
            optionsFilter.alias[name] = alias
            // 处理 boolean
            if (type === 'boolean') {
                optionsFilter.boolean.push(name)
            }
            // 处理 string
            if (type === 'string') {
                optionsFilter.string.push(name)
            }
            // 处理 default
            optionsFilter.default[name] = defaultValue
        })
    }
    console.log(optionsFilter)

    let optsAndArgs: ParsedOptions = getopts(
        commandOptsAndArgsStr,
        optionsFilter
    )
    return optsAndArgs
}

// 执行命令里的操作
const doAction = async function (
    command: CommandType,
    optsAndArgs: ParsedOptions,
    terminal: TerminalType
) {
    // 设置输出折叠
    if (command.collapsible) {
        terminal.setCommandCollapsible(true)
    }
    // 调用 CommandType 上的 action 进行操作
    await command.action(optsAndArgs, terminal)
}
export default executeCommand
