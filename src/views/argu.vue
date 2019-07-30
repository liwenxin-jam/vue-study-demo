<template>
  <!-- <div>{{ $route.params.name }}</div> -->
  <div>{{ name }}</div>
</template>

<script>
export default {
  props: {
    name: {
      type: [String, Number],
      default: "xx"
    }
  },
  // 组件路由发生变化时复用的时候被调用
  beforeRouteUpdate(to, from, next) {
    console.log(to.name, from.name);
  },
  mounted() {}
};
</script>
