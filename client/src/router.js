import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
