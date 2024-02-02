import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'vue-drag-drop-transformer/dist/style.css'
import Magic from 'vue-drag-drop-transformer'

const app = createApp(App)

app.use(ElementPlus)
app.use(Magic)
app.mount('#app')
