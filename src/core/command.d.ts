import { ParsedOptions } from 'getopts'
// 定义命令接口，所有的命令都要实现这个接口
interface CommandType {
    // 命令英文名字(关键字，唯一) 如 help, cd, npm
    command: string
    // 命令中文名字
    name: string
    // 别名
    alias?: string[]
    // 命令功能描述
    desc: string
    // 选项 --key
    options?: CommandOptionsType[]
    // 参数
    args?: CommandArgsType[]
    // 功能
    action: (options: ParsedOption, terminal: TerminalType) => void
    // 结果是否允许折叠
    collapsible?: boolean
}

// 命令选项接口
interface CommandOptionsType {
    // 选项名 --keyword 全称
    name: string
    // 别名 -k  简写
    alias?: string[]
    // 类型
    type: 'string' | 'boolean'
    // 功能描述
    desc: string
    // 默认值
    defaultValue?: string | boolean
    // 是否必要
    required?: boolean
}

// 命令参数接口
interface CommandArgsType {
    // 参数名 word
    name: string
    // 功能描述
    desc: string
    // 默认值
    defaultValue?: string | boolean
    // 是否必要
    required?: boolean
}
