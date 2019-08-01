<template>
  <div>
    <!-- <a-input v-model="inputValue"></a-input> -->
    <!-- v-model 是下边语句的语法糖 -->
    <a-input @input="handleInput" :value="inputValue"></a-input>
    <p>{{ inputValue }} -> last letter: {{ inputLastValueLetter }}</p>
    <!-- <a-show :content="inputValue" /> -->
    <p>appName: {{ appName }}, appNameWithVersion: {{ appNameWithVersion }}</p>
    <p>userName: {{ userName }}, firstLetter is: {{ firstLetter }}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <p>{{ appVersion }}</p>
    <button @click="changeUserName">修改用户名</button>
    <button @click="registerModule">动态创建模块</button>
    <p v-for="(item, index) in todoList" :key="index">{{ item }}</p>
  </div>
</template>

<script>
  import AInput from "_c/AInput.vue";
  import AShow from "_c/AShow.vue";
  import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
  // import { createNamespacedHelpers } from "vuex";
  // const { mapState, mapGetters } = createNamespacedHelpers("user");

  export default {
    name: "store",
    components: {
      // AInput: AInput
      AInput,
      AShow
    },
    data() {
      return {
        inputValue: ""
      };
    },
    computed: {
      // 数组方式
      // ...mapState(["appName"]),
      // 对象方式
      ...mapState({
        appName: state => state.appName,
        // userName: state => state.user.userName,
        appVersion: state => state.appVersion,
        // todoList: state => state.todo ? state.todo.todoList : []
        todoList: state => state.user.todo ? state.user.todo.todoList : []
      }),
      ...mapState("user", {
        userName: state => state.userName
      }),
      // ...mapGetters(['appNameWithVersion']),
      ...mapGetters('user', ['firstLetter']),
      // createNamespacedHelpers方式
      // ...mapState({
      //   userName: state => state.userName
      // }),
      // appName() {
      //   return this.$store.state.appName;
      // },
      // 需要set方法可以定义成对象
      // appName: {
      //   set(newVal) {
      //     this.inputValue = newVal + 'sd';
      //   },
      //   get() {
      //     return this.$store.state.appName;
      //   }
      // },
      // userName() {
      //   return this.$store.state.user.userName;
      // },
      inputLastValueLetter() {
        return this.inputValue.substr(-1, 1);
      },
      appNameWithVersion() {
        return this.$store.getters.appNameWithVersion;
      }
    },
    methods: {
      ...mapMutations(['SET_APP_NAME']),
      // ...mapMutations('user', ['SET_USER_NAME']),
      ...mapMutations({ SET_USER_NAME: 'user/SET_USER_NAME' }),
      ...mapActions(['updateAppName']),
      handleInput(val) {
        this.inputValue = val;
      },
      handleChangeAppName() {
        // this.appName = 'newAppName';
        // this.$store.commit('SET_APP_NAME', 'newAppName');
        // this.$store.commit('SET_APP_NAME', { appName: 'newAppName' });
        // 构建type对象提交，type相当于第一个参数eventName
        // this.$store.commit({ type: 'SET_APP_NAME', appName: 'newAppName' });
        // this.$store.commit("SET_APP_VERSION")

        // this.SET_APP_NAME({ appName: 'newAppName' });

        this.updateAppName();
      },
      changeUserName() {
        // this.SET_USER_NAME('vue-course');
        this.$store.dispatch('updateAppName');
      },
      registerModule() {
        // 动态创建新模块，也可以给已有模块创建子模块
        this.$store.registerModule(['user', 'todo'], {
        // this.$store.registerModule('todo', {
          state: {
            todoList: [
              '学习mutations',
              '学习actions'
            ]
          }
        })
      }
    }
  };
</script>
