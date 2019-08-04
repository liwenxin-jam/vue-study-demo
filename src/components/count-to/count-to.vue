<template>
  <div>
    <!-- id不能重复 -->
    <slot name="before"></slot>
    <span ref="number" :class="countClass" :id="eleId"></span>
    <slot name="after"></slot>
  </div>
</template>

<script>
// https://github.com/inorganik/countUp.js
import CountUp from "countup";
// import './count-to.scss'
export default {
  name: "CountTo",
  props: {
    // 起始值
    startVal: {
      type: Number,
      default: 0
    },
    // 结束值
    endVal: {
      type: Number,
      required: true
    },
    // 小数点后保留几位小数
    decimals: {
      type: Number,
      default: 0
    },
    // 渐变时长，单位秒
    duration: {
      type: Number,
      default: 1
    },
    // 是否使用变速效果，是的话先慢后快。false保持匀速
    useEasing: {
      type: Boolean,
      default: false
    },
    // 是否使用分组
    useGroup: {
      type: Boolean,
      default: true
    },
    // 分组间隔符
    seperator: {
      type: String,
      default: ','
    },
    // 整数和小数全隔符
    decimal: {
      type: String,
      default: '.'
    },
    // 延迟多少毫秒执行动画
    delay: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      counter: {}
    }
  },
  computed: {
    eleId() {
      // 每个组件实例化都会有一个自增不重复的的_uid
      return `count_up_${this._uid}`;
    },
    countClass() {
      return ['count-to-number', this.className]
    }
  },
  mounted() {
    // mounted 已经把dom节点全部挂载完，但不确定是否全部渲染完，如果要确保渲染完，可以在下一帧 nextTick中执行
    this.$nextTick(() => {
      this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
        useEasing: this.useEasing,
        useGroup: this.useGroup,
        seperator: this.seperator,
        decimal: this.decimal
      });

      setTimeout(() => {
        this.counter.start();
        this.emitEndEvent();
      }, this.delay);
    });
  },
  methods: {
    getCount() {
      // console.log(this.$refs.number)
      return this.$refs.number.innerText;
    },
    emitEndEvent() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$emit('on-animation-end', Number(this.getCount()))
        })
      }, this.duration * 1000 + 5)
    }
  },
  watch: {
    endVal(newVal, oldVal) {
      this.counter.update(newVal);
      this.emitEndEvent();
    }
  }
};
</script>

<style lang="scss" scoped>
// .count-to-number {
//   color: palevioletred;
// }
@import './count-to.scss';
</style>
