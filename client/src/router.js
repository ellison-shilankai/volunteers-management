import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/user/login/index.vue'
import Register from './views/user/register/index.vue'
import Index from '@/views/index'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
// import Roles from '@/components/role/Roles.vue'
// import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },

    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        // { path: '/roles', component: Roles },
        { path: '/goods', component: GoodsList },
        // { path: '/categories', component: GoodsCate }
      ]
    },
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
