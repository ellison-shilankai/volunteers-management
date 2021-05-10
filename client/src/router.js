import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/user/login/index.vue'
import Register from './views/user/register/index.vue'
import Index from '@/views/index'
import Activity from '@/views/activities'
import ActivityContent from '@/views/activities/content'
import Organization from '@/views/org'
import OrganizationContent from '@/views/org/content'
import News from '@/views/news'
import NewsContent from '@/views/news/content'
import Home from '@/views/home/Home.vue'
import Welcome from '@/views/home/Welcome.vue'
import Users from '@/views/home/user'
import Activities from '@/views/home/activities'
import Organizes from '@/views/home/organize'
import HomeNews from '@/views/home/news'
import store from '@/store';



Vue.use(Router)
const userRule = {
  path: '/home/users',
  component: Users,
  meta: {
    keepAlive: false
  }
};
const activityRule = {
  path: '/home/activities',
  component: Activities,
  meta: {
    keepAlive: false
  }
};


const orgRule = {
  path: '/home/org',
  component: Organizes,
  meta: {
    keepAlive: false
  }
};
const newsRule = {
  path: '/home/news',
  component: HomeNews,
  meta: {
    keepAlive: false
  }
};
const ruleMapping = {
  'admin': [
    userRule,
    activityRule,
    orgRule,
    newsRule,
  ],
  'organizer': [
    userRule,
    activityRule,
  ],
  'volunteer': []
};
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
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
      path: '/activities/content',
      component: ActivityContent,
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
      path: '/org/content',
      component: OrganizationContent,
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
      // name: 'home',
      component: Home,
      redirect: '/welcome',
      meta: {
        keepAlive: false
      },
      children: [{
          path: '/welcome',
          component: Welcome,
          meta: {
            keepAlive: false
          }
        },
        // {
        //   path: '/home/users',
        //   component: Users,
        //   meta: {
        //     keepAlive: false
        //   }
        // },
        // {
        //   path: '/home/activities',
        //   component: Activities,
        //   meta: {
        //     keepAlive: false
        //   }
        // },
        // {
        //   path: '/home/org',
        //   component: Organizes,
        //   meta: {
        //     keepAlive: false
        //   }
        // },
        // {
        //   path: '/home/news',
        //   component: HomeNews,
        //   meta: {
        //     keepAlive: false
        //   }
        // },

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
router.beforeEach((to, from, next) => {
  if (to.path === '/users/login' || to.path === '/users/register') {
    next();
  } else {
    const token = sessionStorage.getItem('token');
    if (!token) {
      next('/users/login');
    } else {
      next();
    }
  }
});
export function initDynamicRoutes() {
  const currentRoutes = router.options.routes;
  const right = store.state.user.status;
  const temp = ruleMapping[right];
  temp.forEach(item => {
    currentRoutes[7].children.push(item);
  })
  router.options.routes = currentRoutes;
  router.addRoutes(currentRoutes);
}
export default router;