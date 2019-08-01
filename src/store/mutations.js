import vue from 'vue'

const mutations = {
  // state是同级的，params接收外部参数，可以是字符串/对象
  SET_APP_NAME(state, params) {
    // state.appName = params;
    state.appName = params.appName;
  },
  SET_APP_VERSION(state) {
    // 无效 后期主动在state添加数据，不会自动添加getter setter监听
    // state.appVersion = 'v2.0';
    // 响应式
    vue.set(state, 'appVersion', 'v2.0')
  }
}

export default mutations;
