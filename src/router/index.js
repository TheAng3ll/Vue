import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/inicio/InicioView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegistroView from '../views/registro/RegistroView.vue'
import HomeView from '../views/home/HomeView.vue'
import BusquedaView from '../views/busqueda/BusquedaView.vue'
import RecetaView from '../views/receta/RecetaView.vue'

const routes = [
  { path: '/', name: 'inicio', component: InicioView },
  { path: '/home', name: 'home', component: HomeView },
  { path: '/busqueda', name: 'busqueda', component: BusquedaView },
  { path: '/receta/:id', name: 'receta', component: RecetaView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/registrar', name: 'registro', component: RegistroView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
