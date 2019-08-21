<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link>|
       <router-link to="/about">About</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
    </div>-->

    <!-- 单个router-view只需要transition组件包住即可  -->
    <!-- <transition-group name="router"> -->
    <!-- <transition-group :name="routerTransition"> -->
    <router-view key="default" />
    <router-view key="email" name="email" />
    <router-view key="tel" name="tel" />
    <!-- </transition-group> -->
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {
        routerTransition: ""
      };
    },
    watch: {
      // 为某个特定的路由设定特殊的动画效果
      // "$route"(to) {
      //   to.query && to.query.transitionName && (this.routerTransition = to.query.transitionName)
      // }
      '$route' (newRoute) {
        this.UPDATE_ROUTER(newRoute)
      }
    },
    methods: {
      ...mapMutations([
        'UPDATE_ROUTER'
      ])
    }
  };
</script>


<style lang="scss">
  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
  }

  // 未显示，即将要显示 前缀就是transition name
  .router-enter {
    opacity: 0;
  }

  // 没有到有的过程
  .router-enter-active {
    transition: opacity 1s ease;
  }

  // 完全显示
  .router-enter-to {
    opacity: 1;
  }

  // 即将要销毁
  .router-leave {
    opacity: 1;
  }

  // 有到没有的过程
  .router-leave-active {
    transition: opacity 1s ease;
  }

  // 完全销毁
  .router-leave-to {
    opacity: 0;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  @font-face {
    font-family: 'iconfont';
    src: url('./assets/font/iconfont.eot');
    src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
      url('./assets/font/iconfont.woff') format('woff'),
      url('./assets/font/iconfont.ttf') format('truetype'),
      url('./assets/font/iconfont.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .iconfont-svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
