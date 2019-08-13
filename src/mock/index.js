import Mock from 'mockjs'
import { getUserInfo, login, authorization } from './response/user'
import { getTableData, getFileList, getFolderList } from './response/data'

// Mock.mock('http://localhost:3000/getUserInfo', getUserInfo)
Mock.mock(/\/getUserInfo/, getUserInfo)
// Mock.mock(/\/getUserInfo/, { name: 'jam' })
Mock.mock(/\/login/, 'post', login)
Mock.mock(/\/authorization/, 'get', authorization)
Mock.mock(/\/getTableData/, 'get', getTableData)
Mock.mock(/\/getFileList/, 'get', getFileList)
Mock.mock(/\/getFolderList/, 'get', getFolderList)

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

export default Mock
