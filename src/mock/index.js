import Mock from 'mockjs'
import { getUserInfo } from './response/user'

const Random = Mock.Random;

// 延迟多少毫秒触发
Mock.setup({
  timeout: 0
})

Random.extend({
  fruit() {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit)
  }
})

// Mock.mock('http://localhost:3000/getUserInfo', getUserInfo)
Mock.mock(/\/getUserInfo/, getUserInfo)
// Mock.mock(/\/getUserInfo/, { name: 'jam' })

export default Mock
