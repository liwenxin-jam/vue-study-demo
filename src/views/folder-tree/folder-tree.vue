<template>
  <div class="folder-wrapper">
    <!-- <Tree :data="folderTree" :render="renderFunc"></Tree> -->
    <folder-tree :folder-list.sync="folderList" :file-list.sync="fileList" :folder-drop="folderDrop" :file-drop="fileDrop" :beforeDelete="beforeDelete" />
  </div>
</template>

<script>
import FolderTree from "_c/folder-tree";
import { getFolderList, getFileList } from "@/api/data";
import { putFileInFolder, transferFolderToTree } from "@/lib/util";

export default {
  components: {
    FolderTree
  },
  data() {
    return {
      folderList: [],
      fileList: [],
      folderTree: [],
      renderFunc: (h, { root, node, data }) => {
        // console.log(data)
        return (
          <div class="tree-item">
            {data.type === "folder" ? (
              <icon
                type="ios-folder"
                color="#2d8cf0"
                style="margin-right: 10px;"
              />
            ) : (
              ""
            )}
            {data.title}
          </div>
        );
      },
      folderDrop: [
        {
          name: "rename",
          title: "重命名"
        },
        {
          name: "delete",
          title: "删除文件夹"
        }
      ],
      fileDrop: [
        {
          name: "rename",
          title: "重命名"
        },
        {
          name: "delete",
          title: "删除文件"
        }
      ]
    };
  },
  mounted() {
    // axios.all
    Promise.all([getFolderList(), getFileList()]).then(res => {
      // console.log(res)
      this.folderList = res[0].data;
      this.fileList = res[1].data;
      // console.log(transferFolderToTree(putFileInFolder(res[0].data, res[1].data)))
      // this.folderTree = transferFolderToTree(
      //   putFileInFolder(res[0].data, res[1].data)
      // );
    });
  },
  methods: {
    beforeDelete () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let error = null
          // let error = new Error('error')
          if (!error) {
            resolve()
          } else reject(error)
        }, 2000)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.folder-wrapper {
  width: 300px;
  // ::v-deep .tree-item {
  //   display: inline-block;
  //   width: calc(100% - 58px);
  //   height: 30px;
  //   line-height: 30px;
  // }
}
</style>
