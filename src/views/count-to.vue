<template>
  <div>
    <count-to ref="countTo" :end-val="endVal" @on-animation-end="handleEnd">
      <span slot="before">总金额：</span>
      <span slot="after">元</span>
    </count-to>
    <button @click="getNumber">获取数值</button>
    <button @click="update">更新值</button>
  </div>
</template>

<script>
import CountTo from "@/components/count-to";
export default {
  name: "count_to",
  components: { CountTo },
  data() {
    return {
      endVal: 100
    }
  },
  methods: {
    getNumber() {
      this.$refs.countTo.getCount();
    },
    update() {
      this.endVal += Math.random() * 100
    },
    handleEnd(endVal) {
      console.log('endVal:', endVal);
    }
  }
};
</script>

