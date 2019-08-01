import { getAppName } from '@/api/app'

const actions = {
  // updateAppName({ commit }) {
  //   getAppName().then(res => {
  //     // console.log(res)
  //     const { code, info } = res;
  //     // const { code, info: { appName } } = res;
  //     // commit('SET_APP_NAME', res.info);
  //     commit('SET_APP_NAME', info);
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  async updateAppName({ commit }) {
    try {
      const { code, info } = await getAppName();
      commit('SET_APP_NAME', info);
    } catch (err) {
      console.log(err)
    }
  }
}

export default actions;
