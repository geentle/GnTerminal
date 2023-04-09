import CommandInputType = GnTerminal.CommandInputType
import { ref, Ref } from 'vue'

/* 历史命令模块 */
const useHistory = (inputCommand: Ref<CommandInputType>) => {
    // 历史命令
    const history = ref<CommandInputType[]>([])
    // 当前命令位置，默认在尾部
    const historyIndex = ref(history.value.length)
    // 获取所有历史命令
    const getAllHistory = (): CommandInputType[] => {
        return history.value
    }

    // 添加一条历史命令
    const addHistory = (newCommand: CommandInputType) => {
        history.value.push(newCommand)
        // 重置命令位置到尾部
        historyIndex.value = history.value.length
    }

    // 下一条命令
    const getNextHistory = () => {
        if (historyIndex.value < history.value.length - 1) {
            historyIndex.value++
            inputCommand.value.text = history.value[historyIndex.value].text
        } else if (historyIndex.value === history.value.length - 1) {
            historyIndex.value++
            inputCommand.value.text = ''
        }
    }

    // 上一条命令
    const getPreHistory = () => {
        if (historyIndex.value > 0) {
            historyIndex.value--
            inputCommand.value.text = history.value[historyIndex.value].text
        }
    }

    return {
        getAllHistory,
        addHistory,
        getPreHistory,
        getNextHistory,
    }
}

export default useHistory
