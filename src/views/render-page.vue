<template>
  <div>
    <!-- <ul @click="handleClick">
      <li @click.stop="handleClick" v-for="(item, index) in list" :key="`list_item_${index}`">{{ item.name }}</li>
    </ul>-->

    <!-- <list :list="list" :render="renderFunc"></list> -->
    <list :list="list">
      <!-- list.vue 绑定了number属性，通过作用域插槽指代了对象引用 -->
      <count-to slot="aa" slot-scope="count" :end-val="count.number"></count-to>
    </list>
  </div>
</template>

<script>
import List from "_c/list";
import CountTo from "_c/count-to";

export default {
  components: { List, CountTo },
  data() {
    return {
      // list: [{ name: "xx" }, { name: "jam" }]
      list: [{ number: 100 }, { number: 90 }]
    };
  },
  methods: {
    handleClick(event) {
      // console.log(event);
    },
    // 写render函数 h 等价于 createElement
    // renderFunc(createElement, name) {
    //   return createElement("i", {
    //     style: {
    //       color: "pink"
    //     }
    //   }, name);
    // }

    // JSX 语法必须写成 h
    // renderFunc(h, name) {
    renderFunc(h, number) {
      return (
        // <i on-click={this.handleClick} style={{ color: "pink" }}>
        //   {name}
        // </i>
        // JSX 语法使用组件，不需要在components注册
        <CountTo
          nativeOn-click={this.handleClick} // 给最外层容器绑定一个自定义原生事件
          on-on-animation-end={this.handleEnd}
          endVal={number}
          style={{ color: "pink" }}
        ></CountTo>
      );
    },
    handleEnd() {
      // console.log("end!");
    }
  }
};
</script>
