import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../components/inicio_component/inicio.vue'
import Login from '../components/login_component/login.vue'
import Registrar from '../components/registro_component/registro.vue'

const routes = [
  { path: '/', component: Inicio },
  { path: '/login', component: Login },
  { path: '/registrar', component: Registrar }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
