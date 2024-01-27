import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import MagicBox from 'vue-magic-box'

const app = createApp(App)

app.use(ElementPlus)
app.use(MagicBox)
app.mount('#app')
