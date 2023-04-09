import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'ant-design-vue/dist/antd.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const store = createPinia()
store.use(piniaPluginPersistedstate)

app.use(store)
app.use(router)
// app.use(Antd)

app.mount('#app')
