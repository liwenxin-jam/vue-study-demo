<template>
  <Table :columns="columns" :data="data"></Table>
</template>

<script>
  export default {
    name: 'EditTable',
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        insideColumns: [],
        edittingId: '',
        edittingContent: ''
      }
    },
    mounted() {
      // console.log(this.columns)
      this.handleColumns()
    },
    methods: {
      handleColumns() {
        const insideColumns = this.columns.map(item => {
          if (!item.render && item.editable) {
            item.render = (h, { row, index, column }) => {
              const isEditting = this.edittingId === `${column.key}_${index}`
              return (
                <div>
                  {isEditting ? <i-input value={row[column.key]} style="width: 50px;" on-input={this.handleInput}></i-input> : <span>{row[column.key]}</span>}
                  <i-button on-click={this.handleClick.bind(this, { row, index, column })}>{ isEditting ? '保存' : '编辑' }</i-button>
                </div>
              )
            }
            return item
          } else return item
        })
        this.insideColumns = insideColumns
      }
    }
  }
</script>
