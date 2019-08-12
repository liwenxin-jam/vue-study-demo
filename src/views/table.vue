<template>
  <div>
    <edit-table :columns="columns" :data="tableData"></edit-table>
  </div>
</template>

<script>
  import { getTableData } from '@/api/data'
  import EditTable from '_c/edit-table'

  export default {
    components: { EditTable },
    data() {
      return {
        tableData: [],
        columns: [
          { key: 'name', title: '姓名' },
          { key: 'age', title: '年龄', editable: true },
          { key: 'email', title: '邮箱', editable: true }
        ]
      }
    },
    mounted() {
      getTableData().then(response => {
        const res = response.data
        this.tableData = res
      })
    }
  }
</script>
