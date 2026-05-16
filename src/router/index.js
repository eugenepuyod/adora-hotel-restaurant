import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rooms from '../views/Rooms.vue'
import Restaurant from '../views/Restaurant.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/rooms', name: 'Rooms', component: Rooms },
  { path: '/restaurant', name: 'Restaurant', component: Restaurant },
  { path: '/checkout', name: 'Checkout', component: Checkout },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
