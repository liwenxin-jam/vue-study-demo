<template>
  <div class="form-wrapper">
    <!-- <Form ref="form" :label-width="80" :model="formData" :rules="rules">
      <FormItem label="姓名" prop="name">
        <Input v-model="formData['name']" />
      </FormItem>
      <FormItem label="年龄">
        <Input v-model="formData['age']" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">提交</Button>
      </FormItem>
    </Form> -->
  </div>
</template>

<script>
import { sentFormData } from "@/api/data";

// const validatePassCheck = (rule, value, callback) => {
//   if (value !== "lison") {
//     callback(new Error("Name error"));
//   } else {
//     callback();
//   }
// };

export default {
  data() {
    return {
      // formData: {
      //   name: "",
      //   age: 18
      // },
      // rules: {
      //   name: [
      //     {
      //       required: true,
      //       message: "The name cannot be empty",
      //       trigger: "blur"
      //     },
      //     { validator: validatePassCheck, trigger: "blur" }
      //   ]
      // }
    };
  },
  methods: {
    // handleSubmit() {
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       sentFormData({ url: "/formData", data: this.formData }).then(res => {
    //         console.log(res);
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  padding: 20px;
}
</style>
