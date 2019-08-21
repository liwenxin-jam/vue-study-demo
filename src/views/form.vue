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

    <!-- <form-group :list="formList" :url="url"></form-group> -->

    <Button @click="handleSubmit" type="primary">提交</Button>
    <Button @click="handleReset">重置</Button>
    <form-single ref="formSingle" v-for="(item, index) in formList" :key="`form_${index}`" :config="item" :value-data="valueData" :rule-data="ruleData" :error-store="errorStore"></form-single>
  </div>
</template>

<script>
  import clonedeep from 'clonedeep'
  import FormGroup from "_c/form-group";
  import FormSingle from '_c/form-single'
  import formData from '@/mock/response/form-data'
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
      FormGroup,
      FormSingle
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
        formList: formData,
        valueData: {},
        ruleData: {},
        errorStore: {},
        initValueData: {}
      };
    },
    mounted() {
      let valueData = {}
      let ruleData = {}
      let errorStore = {}
      let initValueData = {}
      formData.forEach(item => {
        valueData[item.name] = item.value
        ruleData[item.name] = item.rule
        errorStore[item.name] = ''
        initValueData[item.name] = item.value
      })
      this.valueData = valueData
      this.ruleData = ruleData
      this.errorStore = errorStore
      this.initValueData = initValueData
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

      handleSubmit() {
        let isValid = true
        this.$refs.formSingle.forEach(item => {
          item.validate(valid => {
            if (!valid) isValid = false
          })
        })
        if (isValid) {
          sentFormData({
            url: this.url,
            data: this.valueData
          }).then(res => {
            this.$emit('on-submit-success', res)
          }).catch(err => {
            this.$emit('on-submit-error', err)
            for (let key in err) {
              this.errorStore[key] = err[key]
            }
          })
        }
      },
      handleReset() {
        this.valueData = clonedeep(this.initValueData)
      }
    }
  };
</script>

<style lang="scss" scoped>
  .form-wrapper {
    padding: 20px;
  }
</style>
