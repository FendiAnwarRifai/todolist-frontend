import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
import Profile from '../views/main/profile.vue'
import Users from '../views/main/manageUsers.vue'
import Labels from '../views/main/manageLabels.vue'
import Tasks from '../views/main/manageTodos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/users',
    children: [
      {
        path: 'users',
        name: 'users',
        component: Users
      },
      {
        path: 'labels',
        name: 'labels',
        component: Labels
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: Tasks
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
