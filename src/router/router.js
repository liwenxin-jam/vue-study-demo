import Home from '../views/Home.vue'
import Layout from '@/views/layout.vue'

export default [{
    path: '/home',
    // alias: '/home_page', // 设置访问别名
    name: 'home',
    component: Layout,
    // // props: route => { return {} } // 等价于后者
    // props: route => ({ food: route.query.food }),
    // // 路由独享
    // beforeEnter: (to, from, next) => {
    //   // if(from.name === 'login') alert('这是从登录页进来的');
    //   // else alert('这不是从登录页进来的');
    //   next(); // 必须执行 next() 否则不会跳转页面
    // }
    children: [
      {
        path: 'home_index',
        name: 'home_index',
        meta: {
          title: '首页'
        },
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    props: {
      food: 'banana'
    }
  },
  {
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/views/argu.vue'),
    props: true // 用params作为组件的传入属性
  },
  {
    path: '/count-to',
    name: 'count_to',
    component: () => import('@/views/count-to.vue')
  },
  {
    path: '/menu-page',
    name: 'menu_page',
    component: () => import('@/views/menu-page.vue')
  },
  {
    path: '/component',
    name: 'component',
    component: Layout,
    meta: {
      title: '表格'
    },
    children: [
      {
        path: 'table',
        name: 'table_page',
        meta: {
          title: '表格'
        },
        component: () => import('@/views/table.vue')
      }
    ]
  },
  {
    path: '/render-page',
    name: 'render_page',
    component: () => import('@/views/render-page.vue')
  },
  {
    path: '/split-pane',
    name: 'split_pane',
    component: () => import('@/views/split-pane.vue')
  },
  {
    path: '/parent',
    name: 'parent',
    component: () => import('@/views/parent.vue'),
    children: [{
      path: 'child',
      component: () => import('@/views/child.vue')
    }]
  }, {
    path: '/named_view',
    components: {
      default: () => import('@/views/child.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  }, {
    path: '/main',
    // redirect: '/'
    // redirect: {
    //   name: 'home'
    // }
    // redirect: to => '/'
    redirect: to => {
      console.log(to)
      // return 字符串路径 或者 对象
      return {
        name: 'home'
      }
    }
  }, {
    path: '/store',
    component: () => import('@/views/store.vue')
  }, {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
