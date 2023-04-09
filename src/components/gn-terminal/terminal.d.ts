// 终端操作接口
interface TerminalType {
    //清屏
    clear: () => void
    // 立即输出
    writeOutput: (output: OutputType) => void
    // 立即输出文本
    writeTextOutput: (text: string, status?: OutputStatusType) => void
    // 写命令文本结果
    writeTextResult: (text: string, status?: OutputStatusType) => void
    // 写命令错误文本结果
    writeTextErrorResult: (text: string) => void
    // 写命令成功文本结果
    writeTextSuccessResult: (text: string) => void
    // 写命令结果
    writeResult: (output: OutputType) => void
    // 输入框聚焦
    focusInput: () => void
    // // 获取输入框是否聚焦
    // isInputFocused: () => boolean
    // // 设置输入框的值
    setTabCompletion: () => void
    // 提交命令
    handleSubmitCommand: () => void
    // 查看下一条命令
    showNextCommand: () => void
    // // 查看上一条命令
    showPreCommand: () => void
    // 查看历史命令
    getAllCommandHistory: () => CommandOutputType[]
    // 折叠 / 展开所有块
    toggleAllCollapse: () => void
    // 设置命令是否可折叠
    setCommandCollapsible: (collapsible: boolean) => void
    // 自动滚动到底部
    autoBottom: () => void
    // 加载异步组件状态切换
    loadingAsyncComponentSwitch: (status: boolean) => void
}
