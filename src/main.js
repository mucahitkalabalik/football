import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from './store'
import axios from './utils/axios'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import "@/assets/global.css"

const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(store)
app.use(router)
app.config.globalProperties.$axios = axios
app.mount('#app')
