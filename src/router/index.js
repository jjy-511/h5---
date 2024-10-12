import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Records from '../views/Records.vue'
import Stats from '../views/Stats.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/records', name: 'Records', component: Records },
  { path: '/stats', name: 'Stats', component: Stats }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
