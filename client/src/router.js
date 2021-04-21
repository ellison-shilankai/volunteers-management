import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/user/login/index.vue'
import Register from './views/user/register/index.vue'
import Index from '@/views/index'
import Activity from '@/views/activities'
import Organization from '@/views/org'
import News from '@/views/news'
import NewsContent from '@/views/news/content'
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
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/activities',
      // name: 'activity',
      component: Activity,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/org',
      component: Organization,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/news',
      component: News,
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/news/content',
      component: NewsContent,
      meta: {
        keepAlive: true
      },
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
    //注册登录
    {
      path: '/users/login',
      alias: '/login',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/users/register',
      alias: '/register',
      name: 'Register',
      component: Register,
      meta: {
        keepAlive: false
      }
    }
  ]
})
