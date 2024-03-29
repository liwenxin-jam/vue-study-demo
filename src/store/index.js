import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'
import router from './module/router'
import tabNav from './module/tabNav'
// import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV === 'development', // 严格模式，默认false
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    router,
    tabNav
  },
  // plugins: [saveInLocal]  // 持久化开发
})
