import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/user/login/index.vue'
import Register from './views/user/register/index.vue'

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
      path: '/users/login',
      alias: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users/register',
      alias: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
