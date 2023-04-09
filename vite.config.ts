import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// @ts-ignore
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // 按需加载 ant-design-vue
        Components({
            resolvers: [AntDesignVueResolver()],
        }),
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                // 生产环境去掉日志
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})
