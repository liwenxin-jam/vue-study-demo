import { login, authorization } from '@/api/user'
import { setToken } from '@/lib/util'

const state = {
  userName: 'Jam',
  rules: {}
}

const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}

const mutations = {
  SET_USER_NAME(state, params) {
    state.userName = params;
  },
  SET_RULES(state, rules) {
    state.rules = rules;
  }
}

const actions = {
  updateUserName({ commit, state, rootState, dispatch }) {
    // rootState.appName
    // dispatch('xxx', '')
  },
  xxx() {

  },
  login ({ commit }, { userName, password }) {
    return new Promise((resolve, reject) => {
      login({ userName, password }).then(response => {
        let res = response.data;
        if (res.code === 200 && res.data.token) {
          setToken(res.data.token)
          resolve()
        } else {
          reject(new Error('错误'))
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  authorization ({ commit }, token) {
    return new Promise((resolve, reject) => {
      authorization().then(response => {
        let res = response.data;
        if (parseInt(res.code) === 401) {
          reject(new Error('token error'))
        } else {
          setToken(res.data.token)
          resolve(res.data.rules.page)
          commit('SET_RULES', res.data.rules.component)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout () {
    setToken('')
  }
}

export default {
  // 开启命名空间，1）取数据需要带上模块名称 2）可以使用 createNamespacedHelpers 方法生成state和getter
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
