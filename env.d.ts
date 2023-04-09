/// <reference types="vite/client" />
// TypeScript 的智能提示
interface ImportMetaEnv {
    // readonly VITE_APP_TITLE: string
    readonly VITE_BASE_URL: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
