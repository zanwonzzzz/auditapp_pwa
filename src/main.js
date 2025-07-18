import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Login from './views/Login.vue'
import Menu from './views/Menu.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router/routes.vue'
import Vue3Geolocation from 'vue3-geolocation'
import firebaseApp from './firebase'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)
app.component('font-awesome-icon',FontAwesomeIcon)
app.use(router)
app.use(Vue3Geolocation)
app.use(ToastPlugin)
app.mount('#app')
