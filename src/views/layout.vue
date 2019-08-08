<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <!-- breakpoint="sm" 当浏览器宽度小于设定值，就会自动把side收缩起来 xs: '480px',sm: '576px',md: '768px',lg: '992px',xl: '1200px',xxl: '1600px' -->
      <Sider :width="200" collapsible hide-trigger reverse-arrow v-model="collapsed" class="sider-outer">

      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" :size="32" />
        </Header>
        <Content>
          <div class="view-box">
            <Card shadow class="page-card">
              <router-view />
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        collapsed: false
      }
    },
    computed: {
      triggerClasses() {
        return ['trigger-icon', this.collapsed ? 'rotate' : '']
      }
    },
    methods: {
      handleCollapsed() {
        this.collapsed = !this.handleCollapsed;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-wrapper,
  .layout-outer {
    height: 100%;

    .header-wrapper {
      background: #fff;
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
      padding: 0 23px;

      .trigger-icon {
        cursor: pointer;
        transition: transform .3s ease;

        &.rotate {
          transform: rotateZ(-90deg);
          transition: transform .3s ease;
        }
      }
    }

    .sider-outer {
      height: 100%;
      overflow: hidden;

      .ivu-layout-sider-children {
        margin-right: -20px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }

    .content-con {
      padding: 0;

      .ivu-tabs-bar {
        margin-bottom: 0;
      }

      .view-box {
        padding: 0;
      }
    }

    .page-card {
      // min-height: ~"calc(100vh - 84px)";  // less方式 calc
      min-height: calc(100vh - 84px);
    }
  }
</style>
