import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../views/auth/login.vue'
import Register from '../views/auth/register.vue'
import Main from '../views/main.vue'
import Profile from '../views/main/profile.vue'
import Users from '../views/main/manageUsers.vue'
import Labels from '../views/main/manageLabels.vue'
import Tasks from '../views/main/manageTodos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: '/i',
    name: 'main',
    component: Main,
    redirect: '/i/users',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'users',
        name: 'users',
        component: Users,
        meta: { requiresAuth: true }
      },
      {
        path: 'labels',
        name: 'labels',
        component: Labels,
        meta: { requiresAuth: true }
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: Tasks,
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      Vue.swal.fire({
        title: 'Error!',
        text: 'the page cannot be accessed',
        icon: 'error',
        confirmButtonText: 'Relogin'
      })
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      Vue.swal.fire({
        title: 'Error!',
        text: 'the page cannot be accessed',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      next({
        path: '/i'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
