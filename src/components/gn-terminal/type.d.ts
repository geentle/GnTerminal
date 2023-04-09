declare namespace GnTerminal {
    // 命令输入类型
    interface CommandInputType {
        text: string
        placeholder?: string
    }

    // 输出状态类型
    type OutputStatusType = 'info' | 'success' | 'warning' | 'error' | 'system'

    // 命令输出类型
    interface CommandOutputType {
        type: 'command' | 'text' | 'component'
        text?: string // 输出文本
        resultList?: CommandOutputType[] // 输出列表
        component?: any // 输出是组件
        status?: OutputStatusType // 输出状态
        props?: any // 要传给组件的参数
        collapsible?: boolean // 是否折叠
    }
}
