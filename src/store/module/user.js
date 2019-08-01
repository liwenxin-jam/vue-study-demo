const state = {
  userName: 'Jam'
}

const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}

const mutations = {
  SET_USER_NAME(state, params) {
    state.userName = params;
  }
}

const actions = {
  updateUserName({ commit, state, rootState, dispatch }) {
    // rootState.appName
    // dispatch('xxx', '')
  },
  xxx() {

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
