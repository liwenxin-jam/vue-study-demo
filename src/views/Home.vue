<template>
  <div class="home">
    <!-- <b>{{ food }}</b>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到parent</button>
    <button @click="handleClick('replace')">替换到parent</button>
    <button @click="getInfo" :style="{background: bgColor}">请求数据</button>
    <img :src="url" />
    <button @click="handleLogout">退出登录</button> -->

    <Row>
      <!-- 无法识别 Col 需要转成 i-col -->
      <!-- <Col></Col> -->
      <i-col></i-col>
    </Row>
    <Row :gutter="10">
      <i-col span="12">{{ rules }}</i-col>
      <i-col span="12"></i-col>
    </Row>
    <Row :gutter="10" class="blue">
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
      <i-col :md="6" :sm="12" :xs="24"></i-col>
    </Row>
    <Button v-if="rules.edit_button">编辑</Button>
    <Button v-if="rules.publish_button">发布</Button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from "@/components/HelloWorld.vue";
  import axios from "axios";
  import { getUserInfo } from "@/api/user";
  import { mapState, mapActions } from 'vuex'

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
    computed: {
      ...mapState({
        rules: state => state.user.rules
      })
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
    // beforeRouteLeave(to, from, next) {
    //   const leave = confirm("您确定要离开吗？");
    //   if (leave) next();
    //   else next(false);
    // },
    methods: {
      ...mapActions('user', [
        'logout'
      ]),
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
      },
      handleLogout() {
        this.logout()
        this.$router.push({
          name: 'login'
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    .ivu-col {
      height: 50px;
      margin-top: 10px;
      background: pink;
      background-clip: content-box;
    }

    .blue {
      .ivu-col {
        background: blue;
        background-clip: content-box;
      }
    }
  }
</style>
