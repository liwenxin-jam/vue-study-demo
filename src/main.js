import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
// import CountTo from '_c/count-to'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.prototype.$bus = Bus
Vue.use(iview)
Vue.config.productionTip = false

const handleClick = (event) => {
  event.stopPropagation();
  console.log(event);
}

let list = [{name: 'jam'}, {name: 'xx'}]
const getLiEleArr = (h) => {
  return list.map((item, index) => h('li', {
    on: {
      'click': handleClick
    },
    key: `list_item_${index}`
  }, item.name))
}

new Vue({
  router,
  store,
  render: h => h(App)
  // render: h => {
    // return h('div', {
    //   attrs: {
    //     id: 'box'
    //   },
    //   style: {
    //     color: 'pink'
    //   }
    // }, 'jam')

  //   return h(CountTo, {
  //     // 'class': 'count-to wrapper',
  //     // 'class': ['count-to', true ? 'aa' : 'bb'],
  //     // 'class': { 'count-to': true },
  //     props: {
  //       endVal: 100
  //     },
  //     // domProps: {
  //     //   innerHTML: '123'
  //     // },
  //     on: {
  //       'on-animation-end': (val) => {
  //         console.log('animation end')
  //       }
  //     },
  //     nativeOn: {
  //       'click': () => {
  //         console.log('click!')
  //       }
  //     },
  //     directives: [],
  //     scopedSlots: {},
  //     slot: '',
  //     key: '',
  //     ref: ''
  //   })
  // }

  // render: h => h('div', [
  //   h('span', '111'),
  //   h('span', '222')
  // ])

  // render: h => h('div', [
  //   h('ul', {
  //     on: {
  //       'click': handleClick
  //     }
  //   }, getLiEleArr(h))
  // ])
}).$mount('#app')
