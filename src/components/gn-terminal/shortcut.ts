/* 快捷键模块 */
export const registShortcuts = (terminal: TerminalType) => {
    // 全局监视有哪个按键按下了
    document.onkeydown = (e) => {
        const isCharacter =
            (e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z')
        const isNumber = e.key >= '0' && e.key <= '9'
        // 如果按的是 字母或数字 就聚焦回input
        if (
            !e.metaKey &&
            !e.ctrlKey &&
            !e.shiftKey &&
            (isCharacter || isNumber)
        ) {
            terminal.focusInput()
        }

        // 如果按的是 符合快捷键规则的
        for (let shortcut of shortcutList) {
            if (
                e.code === shortcut.code &&
                e.ctrlKey === !!shortcut.ctrlKey &&
                e.metaKey === !!shortcut.metaKey &&
                e.shiftKey === !!shortcut.shiftKey
            ) {
                shortcut.action(e, terminal)
                // terminal.focusInput()
            }
        }
    }
}

// 快捷键类型
interface ShortcutType {
    code: string
    desc?: string
    keyDesc?: string
    ctrlKey?: boolean
    metaKey?: boolean
    shiftKey?: boolean
    action: (e: Event, terminal: TerminalType) => void
}

export const shortcutList: ShortcutType[] = [
    {
        desc: '清屏',
        code: 'KeyL',
        keyDesc: 'Ctrl + L',
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault()
            terminal.clear()
        },
    },
    {
        desc: '上一条命令',
        code: 'ArrowUp',
        keyDesc: 'up',
        action(e, terminal) {
            e.preventDefault()
            terminal.showPreCommand()
        },
    },
    {
        desc: '下一条命令',
        code: 'ArrowDown',
        keyDesc: 'down',
        action(e, terminal) {
            e.preventDefault()
            terminal.showNextCommand()
        },
    },
    {
        desc: 'Tab补全',
        code: 'Tab',
        keyDesc: 'Tab补全',
        action(e, terminal) {
            e.preventDefault()
            terminal.setTabCompletion()
        },
    },
    {
        code: 'Enter',
        action(e, terminal) {
            terminal.focusInput()
        },
    },
    {
        code: 'Backspace',
        action(e, terminal) {
            terminal.focusInput()
        },
    },
    {
        desc: '折叠',
        code: 'KeyO',
        keyDesc: 'Ctrl + O',
        ctrlKey: true,
        action(e, terminal) {
            e.preventDefault()
            terminal.toggleAllCollapse()
        },
    },
]
