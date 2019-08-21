import Mock from 'mockjs';

const Random = Mock.Random;

export const getUserInfo = options => {
  // console.log(options)
  // return {
  //   name: 'jam'
  // }

  const template = {
    'str|2-4': 'jam',
    'name|5': 'lai',
    'age|+2': 18,
    'num|4-10': 0,
    'float|3-10.2-5': 0,
    'bool|1': true, // 1/2的机率
    'bool2|1-9': true, // min/(min+max) 1/10的机率为true
    'obj|2': {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    },
    'obj|1-2': {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    },
    'arr|2-4': [1, 2, 3],
    'arr2|2': ['a', 'b'],
    'func': () => {
      return 'this is create by function'
    },
    'reg': /[1-9][a-z]/,
    // email: Random.email(),
    email: Mock.mock('@email'), // 占位符
    // range: Random.range(3, 6, 1), // 最小 最大 间隔
    range: Random.range(3, 10, 2),
    data: Random.date('yyyy-MM-dd'),
    time: Random.time('hh:mm'),
    datetime: Random.datetime('yyyy-MM-dd hh:mm'),
    now: Random.now('hour', 'yyyy-MM-dd a hh:mm'),
    // img: Random.image(),
    // img: Random.image('100x200'),
    // img: Random.image('100x200', '#0f0'),
    // img: Random.image('100x200', '#0f0', 'jam'),
    // img: Random.image('100x200', '#0f0', '#fff', 'jam'),
    img: Random.image('100x200', '#0f0', '#fff', 'png', 'jam'),
    img_base64: Random.dataImage(),
    color: Random.color(),
    cword: Random.cword('啊但是发生的', 2, 5),
    cname: Random.cname(),
    email2: Random.email('126.com'),
    region: Random.region(),
    province: Random.province(),
    // city: Random.city(),
    city: Random.city(true), // 有上级省份信息
    county: Random.county(true), // 有上级省、市两级
    zip: Random.zip(),
    upperFirstLetter: Random.capitalize('jam'),
    pick: Random.pick([1, 2, 3, 4]), // 任意抽取一个
    shuffle: Random.shuffle([1, 2, 3, 4]), // 打乱随机顺序
    guid: Random.guid(),
    fruit: Random.fruit(),
    fruit2: '@fruit', // 占位符方式
  }
  return Mock.mock(template)

  // let i = 3,
  //   arr = [];
  // while (i--) {
  //   arr.push(template)
  // }

  // return Mock.mock(arr)
}

export const login = () => {
  return {
    code: 200,
    data: {
      token: 'xxx'
    },
    mes: ''
  }
}

export const authorization = () => {
  return {
    code: 200,
    data: {
      token: 'xxx',
      rules: {
        page: {
          home: true,
          home_index: true,
          about: true,
          argu: true,
          count_to: true,
          menu_page: true,
          upload: true,
          form: true,
          optimize: true,
          folder_tree: true,
          table_page: true,
          params: true,
          component: true,
          render_page: true,
          split_pane: true,
          parent: true,
          child: true,
          named_view: true,
          store: true,
          main: true
        },
        component: {
          edit_button: true,
          publish_button: false
        }
      }
    },
    mes: ''
  }
}
