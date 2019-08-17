<template>
  <Form
    ref="form"
    v-if="Object.keys(valueList).length"
    :label-width="labelWidth"
    :model="valueList"
    :rules="rules"
  >
    <FormItem
      v-for="(item, index) in list"
      :key="`${_uid}_${index}`"
      :label="item.label"
      :prop="item.name"
      :error="errorStore[item.name]"
      label-position="left"
      @click.native="handleFocus(item.name)"
    >
      <!-- <Input v-if="item.type === 'input'" /> -->
      <!-- 动态组件 -->
      <compontent :is="item.type" :range="item.range" v-model="valueList[item.name]">
        <template v-if="item.children">
          <component
            v-for="(child, childIndex) in item.children.list"
            :is="item.children.type"
            :key="`${_uid}_${index}_${childIndex}`"
            :label="child.label"
            :value="child.value"
          >{{ child.title }}</component>
        </template>
      </compontent>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit">提交</Button>
      <Button @click="handleReset">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
import clonedeep from "clonedeep";
import { sentFormData } from "@/api/data";

export default {
  name: "FormGroup",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      initValueList: {},
      rules: {},
      valueList: {},
      errorStore: {}
    };
  },
  watch: {
    list() {
      this.setInitValue();
    }
  },
  mounted() {
    this.setInitValue();
  },
  methods: {
    setInitValue() {
      // this.initValueList = this.list.map(item => item.value);
      let rules = {};
      let valueList = {};
      let initValueList = {};
      let errorStore = {};
      this.list.forEach(item => {
        rules[item.name] = item.rule;
        valueList[item.name] = item.value;
        initValueList[item.name] = item.value;
        errorStore[item.name] = "";
      });
      this.rules = rules;
      this.valueList = valueList;
      this.initValueList = initValueList;
      this.errorStore = errorStore;
    },
    handleReset() {
      this.valueList = clonedeep(this.initValueList);
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          sentFormData({ url: this.url, data: this.valueList })
            .then(res => {
              console.log(res);
              this.$emit("on-submit-success", res);
            })
            .catch(err => {
              console.log(err);
              this.$emit("on-submit-error", err);
              for (let key in err.data) {
                this.errorStore[key] = err.data[key];
              }
            });
        } else {
        }
      });
    },
    handleFocus(name) {
      this.errorStore[name] = "";
    }
  }
};
</script>
