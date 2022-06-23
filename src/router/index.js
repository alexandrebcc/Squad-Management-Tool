import { createRouter, createWebHistory } from 'vue-router'
import RegistrationView from '../views/RegistrationView.vue'

const routes = [
  
  {
    path: '/',
    name: 'myteams',
    component: () => import(/* webpackChunkName: "Myteams" */ '../views/MyteamsView.vue')
  },
  {
    path: '/myteams',
    name: 'Myteams',
    component: () => import(/* webpackChunkName: "Myteams" */ '../views/MyteamsView.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import(/* webpackChunkName: "Myteams" */ '../views/RegistrationView.vue')
  },
  {
    path: '/registration/:id',
    name: 'RegistrationId',
    component: () => import(/* webpackChunkName: "Myteams" */ '../views/RegistrationView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
