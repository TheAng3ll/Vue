// main.js
import { createApp } from 'vue'
import './style.css'
import './dark-mode.css'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
