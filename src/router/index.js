import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import store from '@/store'
import { setTitle, setToken, getToken } from '@/lib/util'
import clonedeep from 'clonedeep'

Vue.use(Router)

const router = new Router({
  mode: 'hash', // 默认 hash history
  routes
})

// 是否登录过
// const HAS_LOGING = false;

// 全局前置守卫，能阻止页面跳转
router.beforeEach((to, from, next) => {
  // if(to.meta.title)
  to.meta && setTitle(to.meta.title);
  // if (to.name !== 'login') {
  //   if (HAS_LOGING) next();
  //   else next({ name: 'login' }); // next() 用法与 $router.push() 用法一致
  // } else {
  //   if (HAS_LOGING) next({ name: 'home' });
  //   else next();
  // }

  // const token = getToken()
  // if (token) {
  //   store.dispatch('user/authorization', token).then(() => {
  //     if (to.name === 'login') next({ name: 'home' })
  //     else next()
  //   }).catch(() => {
  //     setToken('')
  //     next({ name: 'login' })
  //   })
  // } else {
  //   if (to.name === 'login') next()
  //   else next({ name: 'login' })
  // }

  const token = getToken()
  if (token) {
    if (!store.state.router.hasGetRules) {
      store.dispatch('user/authorization').then(rules => {
        store.dispatch('concatRoutes', rules).then(routers => {
          router.addRoutes(clonedeep(routers))
          next({ ...to, replace: true })
        }).catch(() => {
          next({ name: 'login' })
        })
      })
    } else {
      next()
    }
  } else {
    if (to.name === 'login') {
      next();
    } else {
      next({ name: 'login' })
    }
  }
})

// 全局守卫，所有导航被确认之前 或者异步组件渲染前
// router.beforeResolve((to, from, next) => {})

// 全局后置守卫钩子，不能阻止页面跳转
router.afterEach((to, from) => {
  // logining = false
})

/*
 * 1. 导航被触发
 * 2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 * 3. 调用全局的前置守卫 beforeEach
 * 4. 在重用的组件里调用 beforeRouteUpdate
 * 5. 调用路由独享的守卫 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8. 调用全局的解析守卫 beforeResolve
 * 9. 导航被确认
 * 10. 调用全局的后置守卫 afterEach
 * 11. 触发DOM更新
 * 12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数
 */

export default router
