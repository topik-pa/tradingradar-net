import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stock/:isin',
    name: 'Stock',
    component: () => import(/* webpackChunkName: "stock" */ '../views/Stock.vue')
  },
  {
    path: '/api/:id',
    name: 'Api',
    component: () => import(/* webpackChunkName: "api" */ '../views/Api.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import(/* webpackChunkName: "privacy" */ '../views/Privacy.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
