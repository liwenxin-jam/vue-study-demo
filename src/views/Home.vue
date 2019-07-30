<template>
  <div class="home">
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    handleClick(type) {
      // this.$router.go(-1);
      if (type === "back") {
        this.$router.back();
      } else if (type === "push") {
        // this.$router.push('/parent');
        // this.$router.push({ name: "parent" });
        // this.$router.push({ name: "argu", params: { name: "jam" } });
        // 用path无法带参数
        // this.$router.push({ path: "/argu", params: { name: "jam" } });
        // es6模板写法
        const name = "jam";
        this.$router.push({ path: `/argu/${name}` });
      } else if (type === "replace") {
        this.$router.replace({ name: "parent" });
      }
    }
  }
};
</script>
