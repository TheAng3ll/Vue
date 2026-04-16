import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '@/views/inicio/InicioView.vue'
import LoginView from '@/views/login/LoginView.vue'
import RegistroView from '@/views/registro/RegistroView.vue'

const routes = [
  { path: '/', component: InicioView },
  { path: '/login', component: LoginView },
  { path: '/registrar', component: RegistroView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
