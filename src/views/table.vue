<template>
  <div>
    <!-- <edit-table :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table> -->
    <edit-table-mul :columns="columns" v-model="tableData"></edit-table-mul>
  </div>
</template>

<script>
import { getTableData } from "@/api/data";
import EditTable from "_c/edit-table";
import EditTableMul from "_c/edit-table-mul";

export default {
  components: { EditTable, EditTableMul },
  data() {
    return {
      tableData: [],
      columns: [
        { key: "name", title: "姓名" },
        { key: "age", title: "年龄", editable: true },
        { key: "email", title: "邮箱", editable: true }
      ]
    };
  },
  mounted() {
    getTableData().then(response => {
      const res = response.data;
      this.tableData = res;
    });
  },
  methods: {
    handleEdit({ row, index, column, newValue }) {
      console.log(row, index, column, newValue);
    }
  }
};
</script>
