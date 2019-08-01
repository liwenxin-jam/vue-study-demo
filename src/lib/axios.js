import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInstanceConfig() {
    const config = {
      baseUrl: this.baseUrl,
      headers: {

      }
    }
    return config
  }
  interceptors(instance) {
    instance.interceptors.request.use(config => {
      // 添加全局的loading
      // Spin.show()
      console.log(config)
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      console.log(res)
      return res
    }, error => {
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInstanceConfig(), options);
    this.interceptors(instance);
    return instance(options);
  }
}

export default HttpRequest
