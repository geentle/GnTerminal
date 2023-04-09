import { ref } from 'vue'
import _, { trim } from 'lodash'
import { commandMap } from '../../core/commandRegister'
import { useTerminalStore } from '../../stores/terminalStore'
import { usageStrFormatter } from '../../core/commands/help/componets/helpUtils'

// 命令提示模块
function useHint() {
    let hint = ref<string>('')
    // 更新 提示 的方法
    function updateHint(inputText: string): void {
        const { showHint } = useTerminalStore()
        // 如果没开启提示
        if (!showHint) {
            return
        }
        // 取输入的前缀
        const key: string = trim(inputText).split(' ')[0].toLowerCase()
        // 如果输入前缀为空
        if (key === '') {
            hint.value = ''
            return
        }
        // 前缀作为 key 进行匹配
        const likeKey: string = matchKey(key)
        console.log('匹配到 => ', likeKey)
        // 若没匹配到则返回
        if (likeKey == '') {
            return
        }

        // 获取 command 实例
        const commandInstance = commandMap.get(likeKey)
        // 匹配到了key却找不到实例
        if (!commandInstance) {
            throw Error(`命令集出错，命令${likeKey}获取不到实例`)
        }
        // 获取 格式化 command 得到的 hint
        hint.value = usageStrFormatter(commandInstance)
    }

    // 具有防抖的更新提示方法
    const debounceUpdateHint: (inputText: string) => any = _.debounce(function (
        inputText: string
    ) {
        updateHint(inputText)
    },
    200)

    return {
        hint,
        updateHint,
        debounceUpdateHint,
    }
}

// 命令名匹配方法
// eg: ba => baidu
const matchKey = function (key: string): string {
    let likeKey = ''
    const commandKeys = commandMap.keys()
    for (let commandKey of commandKeys) {
        if (commandKey.startsWith(key)) {
            likeKey = commandKey
            break
        }
    }
    return likeKey
}

export default useHint
