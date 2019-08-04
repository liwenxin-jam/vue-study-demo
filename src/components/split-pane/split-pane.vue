<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left" :style="{ width: leftOffsetPercent, paddingRight: `${triggerWidth / 2}px` }">
      <!-- <button @click="handleClick">更改offset</button> -->
      <slot name="left"></slot>
    </div>
    <div
      class="pane-trigger-con"
      @mousedown="handleMousedown"
      :style="{ left: triggerLeft, width: `${triggerWidth}px` }"
    ></div>
    <div class="pane pane-right" :style="{ left: leftOffsetPercent, paddingLeft: `${triggerWidth / 2}px` }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SplitPane",
  props: {
    value: {
      type: Number,
      default: 0.5
    },
    triggerWidth: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  data() {
    return {
      leftOffset: 0.3,
      canMove: false,
      initOffset: 0
    };
  },
  computed: {
    leftOffsetPercent() {
      // return `${this.leftOffset * 100}%`;
      return `${this.value * 100}%`;
    },
    triggerLeft() {
      // return `calc(${this.leftOffset * 100}% - ${this.triggerWidth / 2}px)`;
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`;
    }
  },
  methods: {
    handleClick() {
      // this.leftOffset -= 0.02;
    },
    handleMousedown() {
      document.addEventListener("mousemove", this.handleMousemove);
      document.addEventListener("mouseup", this.handleMouseup);
      this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left;
      this.canMove = true;
    },
    handleMousemove(event) {
      if (!this.canMove) return;
      const outerRect = this.$refs.outer.getBoundingClientRect();
      // console.log(outerRect)
      // console.log(event.pageX - outerRect.left);
      // 偏移量除于宽度
      let offsetPercent = (event.pageX - this.initOffset + this.triggerWidth / 2 - outerRect.left) / outerRect.width;
      if(offsetPercent < this.min) {
        offsetPercent = this.min;
      }
      if(offsetPercent > this.max) {
        offsetPercent = this.max;
      }
      // this.leftOffset = offsetPercent;
      // this.value = offsetPercent; // 不能直接修改 props 值
      // this.$emit('input', offsetPercent);
      this.$emit('update:value', offsetPercent)
    },
    handleMouseup() {
      this.canMove = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.split-pane-wrapper {
  height: 100%;
  position: relative;

  .pane {
    position: absolute;
    height: 100%;
    top: 0;

    &-left {
      background: palevioletred;
    }

    &-right {
      right: 0;
      bottom: 0;
      background: paleturquoise;
    }

    &-trigger-con {
      height: 100%;
      background: red;
      position: absolute;
      top: 0;
      z-index: 10;
      user-select: none;
      cursor: col-resize;
    }
  }
}
</style>

