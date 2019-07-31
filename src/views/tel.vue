<template>
  <div class="tel">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  mounted() {
    this.$bus.$on("on-click", val => {
      console.log(val);
      this.message = val;
    });
  }
};
</script>

<style>
.tel {
  border: 1px solid red;
}
</style>
