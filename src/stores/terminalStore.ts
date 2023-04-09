import { defineStore } from 'pinia'
import { Names } from './store-name'
export const useTerminalStore = defineStore(Names.TERMINAL, {
    state: () => ({
        // 是否激活命令提示
        showHint: true,
        // 背景
        background: 'black',
    }),
    getters: {},
    // 持久化
    persist: {
        key: 'terminal-store',
        storage: window.localStorage,
        beforeRestore: (context) => {
            console.log('load terminalConfigStore data start')
        },
        afterRestore: (context) => {
            console.log('load terminalConfigStore data end')
        },
    },
    actions: {
        setOrSwicthShowHint(status?: string): boolean {
            if (!status) {
                this.showHint = !this.showHint
            } else {
                if (status === 'on') {
                    this.showHint = true
                } else if (status === 'off') {
                    this.showHint = false
                }
            }
            return this.showHint
        },
        reset() {
            this.$reset()
        },
        setBackground(url: string) {
            this.background = url
        },
        resetBackground() {
            this.background = 'black'
        },
    },
})
