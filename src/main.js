import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Login from './views/Login.vue'
import Menu from './views/Menu.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router/routes.vue'

const app = createApp(App)
app.component('font-awesome-icon',FontAwesomeIcon)
app.use(router)
app.mount('#app')
