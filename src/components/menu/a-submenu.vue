<template>
  <ul class="a-submenu">
    <div class="a-submenu-title" @click="handleClick">
      <slot name="title"></slot>
      <span class="shrink-icon" :style="{ transform: `rotateZ(${showChild ? 0 : 180}deg)` }">^</span>
    </div>
    <div v-show="showChild" class="a-submenu-child-box">
      <slot></slot>
    </div>
  </ul>
</template>

<script>
export default {
  name: "ASubmenu",
  data() {
    return {
      showChild: false
    };
  },
  methods: {
    handleClick() {
      this.showChild = !this.showChild;
    }
  }
};
</script>

<style lang="scss" scoped>
.a-submenu {
  background: rgb(33, 35, 39);
  padding: 0;
  &-title {
    color: #fff;
    position: relative;
    .shrink-icon {
      position: absolute;
      top: 4px;
      right: 10px;
    }
  }
  &-child-box {
    overflow: hidden;
    padding-left: 20px;

    & * {
      list-style: none;
    }
  }
  li {
    background: rgb(33, 35, 39);
  }
}
</style>
