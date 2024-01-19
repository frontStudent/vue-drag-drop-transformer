import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import MagicBox from 'vue-magic-box'
const app = createApp(App)

app.use(MagicBox)
app.mount('#app')
