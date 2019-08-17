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
    </Form>-->

    <form-group :list="formList" :url="url"></form-group>
  </div>
</template>

<script>
import FormGroup from "_c/form-group";
import { sentFormData } from "@/api/data";

// const validatePassCheck = (rule, value, callback) => {
//   if (value !== "lison") {
//     callback(new Error("Name error"));
//   } else {
//     callback();
//   }
// };

export default {
  components: {
    FormGroup
  },
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
      // },
      url: "/data/formData",
      formList: [
        // { name: 'name', type: 'input', value: '', label: '姓名' },
        {
          name: "name",
          type: "i-input",
          value: "",
          label: "姓名",
          rule: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur"
            }
          ]
        },
        {
          name: "range",
          type: "slider",
          value: [10, 40],
          range: true,
          label: "范围"
        },
        {
          name: "sex",
          type: "i-select",
          value: "",
          label: "性别",
          children: {
            type: "i-option",
            list: [
              { value: "man", title: "男" },
              { value: "woman", title: "女" }
            ]
          }
        },
        {
          name: "education",
          type: "radio-group",
          value: 1,
          label: "学历",
          children: {
            type: "radio",
            list: [
              { label: 1, title: "本科" },
              { label: 2, title: "研究生" },
              { label: 3, title: "博士" }
            ]
          }
        },
        {
          name: "skill",
          type: "checkbox-group",
          value: [],
          label: "技能",
          children: {
            type: "checkbox",
            list: [
              { label: 1, title: "Vue" },
              { label: 2, title: "Nodejs" },
              { label: 3, title: "MySql" }
            ]
          }
        },
        {
          name: "inWork",
          type: "i-switch",
          value: true,
          label: "在职"
        }
      ]
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
