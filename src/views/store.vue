<template>
  <div>
    <!-- <a-input v-model="inputValue"></a-input> -->
    <!-- v-model 是下边语句的语法糖 -->
    <a-input @input="handleInput" :value="inputValue"></a-input>
    <p>{{ inputValue }} -> last letter: {{ inputLastValueLetter }}</p>
    <!-- <a-show :content="inputValue" /> -->
    <!-- <p>appName: {{ appName }}, appNameWithVersion: {{ appNameWithVersion }}</p> -->
    <p>userName: {{ userName }}, firstLetter is: {{ firstLetter }}</p>
  </div>
</template>

<script>
import AInput from "_c/AInput.vue";
import AShow from "_c/AShow.vue";
import { mapState, mapGetters } from "vuex";
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
    // ...mapState({
    //   appName: state => state.appName,
    //   userName: state => state.user.userName
    // }),
    ...mapState("user", {
      userName: state => state.userName
    }),
    // ...mapGetters(['appNameWithVersion']),
    ...mapGetters('user', ['firstLetter']),
    // createNamespacedHelpers方式
    // ...mapState({
    //   userName: state => state.userName
    // }),
    appName() {
      return this.$store.state.appName;
    },
    // userName() {
    //   return this.$store.state.user.userName;
    // },
    inputLastValueLetter() {
      return this.inputValue.substr(-1, 1);
    },
    // appNameWithVersion() {
    //   return this.$store.getters.appNameWithVersion;
    // }
  },
  methods: {
    handleInput(val) {
      this.inputValue = val;
    }
  }
};
</script>
