<template>
    <div
        class="gn-terminal-wrapper"
        :style="wrapperStyle"
        @click="handleClickWrapper"
    >
        <div ref="terminalRef" class="gn-terminal" :style="mainStyle">
            <!-- 介绍 -->
            <div class="terminal-row">
                <div>
                    <span
                        >Welcome to GnTermianl, a terminal style website.
                    </span>
                    <a
                        href="https://github.com/geentle/GnTerminal"
                        target="_blank"
                        >Github Repo</a
                    >
                </div>

                <div>Try to type command "help" to start.</div>
                <br />
            </div>

            <!-- 折叠栏 -->
            <a-collapse
                v-model:activeKey="activeKeys"
                :bordered="false"
                expand-icon-position="right"
            >
                <template v-for="(output, index) in outputList" :key="index">
                    <!--  -->
                    <a-collapse-panel
                        v-if="output.collapsible"
                        :key="index"
                        class="terminal-row"
                    >
                        <!-- 历史命令 -->
                        <template #header>
                            <span style="user-select: none"
                                >{{ prompt }}>&nbsp;</span
                            >
                            <span>{{
                                output.text?.replaceAll(' ', '&nbsp;')
                            }}</span>
                        </template>
                        <!-- loading async component -->
                        <div
                            v-if="
                                loadingAsyncComponent &&
                                index === outputList.length - 1
                            "
                            class="loading"
                        >
                            <LoadingOutlined
                                :style="{ fontSize: '18px', color: 'green' }"
                            />
                            <span>正在加载组件...</span>
                        </div>
                        <!-- 命令的输出 -->
                        <div
                            v-for="(result, index) in output?.resultList"
                            :key="index"
                            class="terminal-row"
                        >
                            <output-content
                                @rendered="handleAsyncComRendered"
                                :output="result"
                            />
                        </div>
                    </a-collapse-panel>
                    <template v-else>
                        <template v-if="output.type === 'command'">
                            <!-- 历史命令 -->
                            <div class="terminal-row">
                                <span style="user-select: none"
                                    >{{ prompt }}>&nbsp;</span
                                >
                                <span>{{
                                    output.text?.replaceAll(' ', '&nbsp;')
                                }}</span>
                            </div>
                            <!-- loading async component -->
                            <div
                                v-if="
                                    loadingAsyncComponent &&
                                    index === outputList.length - 1
                                "
                                class="loading"
                            >
                                <LoadingOutlined
                                    :style="{
                                        fontSize: '18px',
                                        color: 'green',
                                    }"
                                />
                                <span>正在加载组件...</span>
                            </div>
                            <!-- 命令的输出 -->
                            <div
                                v-for="(result, index) in output?.resultList"
                                :key="index"
                                class="terminal-row"
                            >
                                <output-content
                                    @rendered="handleAsyncComRendered"
                                    :output="result"
                                />
                            </div>
                        </template>
                        <template v-else>
                            <div class="terminal-row">
                                <output-content :output="output" />
                            </div>
                        </template>
                    </template>
                </template>
            </a-collapse>
            <!-- 输入指令-->
            <div class="terminal-row">
                <a-input
                    v-model:value="inputCommand.text"
                    ref="commandInputRef"
                    class="command-input"
                    :placeholder="inputCommand.placeholder"
                    :bordered="false"
                    :disabled="isRunningSubmit || loadingAsyncComponent"
                    autofocus
                    @press-enter="handleSubmitCommand"
                >
                    <template #addonBefore>
                        <span class="command-input-prompt">{{ prompt }}></span>
                    </template>
                </a-input>
            </div>
            <!-- loading -->
            <div v-if="isRunningSubmit" class="loading">
                <LoadingOutlined
                    :style="{ fontSize: '18px', color: 'yellow' }"
                />
                <span>正在处理命令...</span>
            </div>
            <!-- 提示 如果 hint 为空就不显示 -->
            <div
                v-if="hint && !isRunningSubmit && !loadingAsyncComponent"
                class="terminal-row"
                style="color: #bbb"
            >
                提示：{{ hint }}
            </div>
            <div style="margin-bottom: 16px" />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    ref,
    StyleValue,
    watch,
    onMounted,
    nextTick,
    toRefs,
} from 'vue'
import UserType = User.UserType
import { LOCAL_USER } from '../../core/commands/user/userConstant'
import CommandInputType = GnTerminal.CommandInputType
import CommandOutputType = GnTerminal.CommandOutputType
import OutputStatusType = GnTerminal.OutputStatusType
import executeCommand from '../../core/commandExecutor'
import useHint from './hint'
import OutputContent from './OutputContent.vue'
import useHistory from './history'
import { registShortcuts } from './shortcut'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { useTerminalStore } from '@/stores/terminalStore'

// 挂载时注册快捷键
onMounted(() => {
    registShortcuts(terminal)
})

// 父组件传的参数
interface GnTerminalProps {
    height?: string | number
    fullScreen?: boolean
    user?: UserType
    // eslint-disable-next-line vue/require-default-prop
    onSubmitCommand?: (inputText: string) => void
}

// 默认参数
const props = withDefaults(defineProps<GnTerminalProps>(), {
    height: '400px',
    fullScreen: false,
    user: LOCAL_USER as any,
})

// 用户
const { user } = toRefs(props)

// prompt
const prompt = computed(() => {
    return user.value?.username ?? 'local'
})

// 初始命令
const initCommand: CommandInputType = {
    text: '',
    placeholder: '',
}

// 输入命令
let inputCommand = ref<CommandInputType>({
    ...initCommand,
})

// 命令执行的总输出 list
const outputList = ref<CommandOutputType[]>([])

// 使用历史命令模块
const { getAllHistory, addHistory, getNextHistory, getPreHistory } =
    useHistory(inputCommand)

// 是否折叠，默认展开
const activeKeys = ref<string[]>([])

// 当前在处理的命令
let curCommandOutput: CommandOutputType

// 提交正在处理
const isRunningSubmit = ref(false)

// loading

// 终端对象
const terminalRef = ref()

// 处理提交命令（回车触发）
const handleSubmitCommand = async () => {
    isRunningSubmit.value = true
    let curCommand: CommandOutputType = {
        type: 'command',
        text: inputCommand.value.text,
        resultList: [],
    }
    // 保存一份到全局，方便用于输出结果
    curCommandOutput = curCommand
    // 重置 hint
    updateHint('')
    await executeCommand(inputCommand.value.text, terminal)

    // 把执行命令的结果，输出在页面上
    outputList.value.push(curCommand)
    // 添加处理的命令到历史记录
    if (inputCommand.value.text.trim()) {
        addHistory(inputCommand.value)
    }
    // 默认不折叠
    activeKeys.value.push(`${outputList.value.length - 1}`)
    // 自动滚到底部
    // 清空当前输入
    inputCommand.value = { ...initCommand }
    autoBottom()

    isRunningSubmit.value = false
}

// 自动滚动到底部
const autoBottom = () => {
    nextTick(() => {
        console.log(
            'autoButtom: current scrollHeight',
            terminalRef.value.scrollHeight
        )
        terminalRef.value.scrollTo({
            top: terminalRef.value.scrollHeight,
            behavior: 'smooth',
        })
    })
}

// 接收异步组件加载完毕的调用
const handleAsyncComRendered = () => {
    // 关闭 loading 异步组件
    loadingAsyncComponentSwitch(false)

    nextTick(() => {
        autoBottom()
    })
}

/* 引入命令提示 hint 模块 */
const { hint, updateHint, debounceUpdateHint } = useHint()

// 监视输入框，刷新提示
watch(
    () => inputCommand.value.text,
    () => {
        debounceUpdateHint(inputCommand.value.text)
    }
)

// 命令输入框
const commandInputRef = ref()

// 点击wrapper其他地方时，依然保持聚焦输入框
function handleClickWrapper(e: Event): void {
    //@ts-ignore
    if (e.target.className === 'gn-terminal') {
        focusInput()
    }
}

// 终端输出
const writeOutput = (output: CommandOutputType) => {
    outputList.value.push(output)
}

// 终端输出文本
const writeTextOutput = (text: string, status?: OutputStatusType) => {
    let output: CommandOutputType = {
        type: 'text',
        text: text,
        status: status,
    }
    outputList.value.push(output)
}

// 终端命令的结果处输出
const writeResult = (output: CommandOutputType) => {
    curCommandOutput.resultList?.push(output)
}

// 终端命令的结果处输出文本
const writeTextResult = (text: string, status?: OutputStatusType) => {
    let result: CommandOutputType = {
        text,
        status,
        type: 'text',
    }
    curCommandOutput.resultList?.push(result)
}

// 终端命令的结果处输出ERROR文本
const writeTextErrorResult = (text: string) => {
    writeTextResult(text, 'error')
}

// 终端命令的结果处输出SUCCESS文本
const writeTextSuccessResult = (text: string) => {
    writeTextResult(text, 'success')
}

// 清屏
const clear = () => {
    outputList.value = []
}

// 聚焦输入框
const focusInput = () => {
    commandInputRef.value.focus()
}

// 根据提示进行命令补全
const setTabCompletion = () => {
    if (hint.value) {
        let complet = `${hint.value.split(' ')[0]}${
            hint.value.split(' ').length > 1 ? ' ' : ''
        }`
        if (complet.length >= inputCommand.value.text.length) {
            inputCommand.value.text = complet
        }
    }
}

// 下一条命令
const showNextCommand = () => {
    getNextHistory()
}
// 上一条命令
const showPreCommand = () => {
    getPreHistory()
}
// 查看历史命令
const getAllCommandHistory = (): CommandInputType[] => {
    return getAllHistory()
}
// 折叠 / 展开所有块
const toggleAllCollapse = () => {
    // 展开
    if (activeKeys.value.length === 0) {
        activeKeys.value = outputList.value.map((value, index) => {
            return `${index}`
        })
    } else {
        // 折叠
        activeKeys.value = []
    }
}
// 设置命令是否可折叠
const setCommandCollapsible = () => {
    curCommandOutput.collapsible = true
}

// 是否在加载异步组件
const loadingAsyncComponent = ref(false)

// 切换是否在加载异步组件
const loadingAsyncComponentSwitch = (status: boolean): void => {
    loadingAsyncComponent.value = status
    console.log(`switch loadingAsyncComponent ${status}`)
}

/* 终端对象，可以操作终端 */
const terminal: TerminalType = {
    writeOutput,
    writeTextOutput,
    writeResult,
    writeTextResult,
    writeTextErrorResult,
    writeTextSuccessResult,
    clear,
    focusInput,
    setTabCompletion,
    handleSubmitCommand,
    showNextCommand,
    showPreCommand,
    getAllCommandHistory,
    toggleAllCollapse,
    setCommandCollapsible,
    autoBottom,
    loadingAsyncComponentSwitch,
}

/* 终端wrapper样式 */
const wrapperStyle = computed(() => {
    const { background } = useTerminalStore()
    const style = {
        ...mainStyle.value,
    }
    if (background.startsWith('http')) {
        style.background = `url(${background})`
    } else {
        style.background = background
    }
    return style
})

/* 终端主样式 */
const mainStyle = computed(() => {
    const fullScreenStyle: StyleValue = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
    return props.fullScreen
        ? fullScreenStyle
        : {
              height: props.height,
          }
})
</script>

<style scoped>
.gn-terminal-wrapper {
    background: black;
}

.gn-terminal {
    background: rgba(0, 0, 0, 0.6);
    padding: 20px;
    overflow: scroll;
}

.gn-terminal::-webkit-scrollbar {
    /* 去掉滚动条 */
    display: none;
}

.gn-terminal span {
    font-size: 16px;
}

.gn-terminal
    :deep(
        .ant-collapse-icon-position-right
            > .ant-collapse-item
            > .ant-collapse-header
    ) {
    color: white;
    padding: 0;
}

.gn-terminal :deep(.ant-collapse) {
    background: none;
}

.gn-terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
    border: none;
}

.gn-terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
    padding: 0;
}

.command-input {
    caret-color: white;
}

.command-input :deep(input) {
    color: white !important;
    font-size: 16px;
    padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
    background: none;
    border: none;
    padding: 0;
}

.command-input-prompt {
    color: white;
    background: transparent;
}

.terminal-row {
    color: white;
    font-size: 16px;
    font-family: courier-new, courier, monospace;
}

.loading span {
    color: greenyellow;
    margin-left: 10px;
    font-size: 14px;
    font-family: courier-new, courier, monospace;
}
</style>
