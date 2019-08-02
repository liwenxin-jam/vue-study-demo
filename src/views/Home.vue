<template>
  <div class="home">
    <b>{{ food }}</b>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
    <button @click="getInfo" :style="{background: bgColor}">请求数据</button>
    <img :src="url" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import { getUserInfo } from "@/api/user";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  props: {
    food: {
      type: String,
      default: "apple"
    }
  },
  data() {
    return {
      url: "",
      bgColor: ""
    };
  },
  // 渲染该组件路由被确认前会调用
  beforeRouteEnter(to, from, next) {
    // 这里无法获取到当前实例 this，通过next回调可以取到当前实例
    // next();
    next(vm => {
      console.log(vm);
    });
  },
  // 编辑了一些内容，用户还没有保存提醒用户是否要保存
  beforeRouteLeave(to, from, next) {
    const leave = confirm("您确定要离开吗？");
    if (leave) next();
    else next(false);
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
    },
    getInfo() {
      // axios.post("/getUserInfo", { userId: 21 }).then(res => {
      //   console.log(res);
      // });

      getUserInfo({ userId: 123 }).then(res => {
        let data = res.data;
        console.log("res:", data);
        this.url = data.img;
        this.bgColor = data.color;
      });
    }
  }
};
</script>
