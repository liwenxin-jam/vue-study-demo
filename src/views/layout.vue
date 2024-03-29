<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <!-- breakpoint="sm" 当浏览器宽度小于设定值，就会自动把side收缩起来 xs: '480px',sm: '576px',md: '768px',lg: '992px',xl: '1200px',xxl: '1600px' -->
      <Sider
        :width="200"
        collapsible
        hide-trigger
        reverse-arrow
        v-model="collapsed"
        class="sider-outer"
      >
        <side-menu :collapsed="collapsed" :list="routers"></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" :size="32" />
        </Header>
        <Content class="content-con">
          <div>
            <Tabs type="card" @on-click="handleClickTab" :value="getTabNameByRoute($route)">
              <TabPane
                :label="labelRender(item)"
                :name="getTabNameByRoute(item)"
                v-for="(item, index) in tabList"
                :key="`tabNav${index}`"
              ></TabPane>
            </Tabs>
          </div>
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
import SideMenu from "_c/side-menu";
import { mapState, mapMutations, mapActions } from "vuex";
import { getTabNameByRoute, getRouteById } from "@/lib/util";

export default {
  components: {
    SideMenu
  },
  data() {
    return {
      collapsed: false,
      getTabNameByRoute
      // menuList: [{
      //     title: '1',
      //     name: 'menu1',
      //     icon: 'ios-alarm'
      //   }, {
      //     title: '2',
      //     name: 'menu2',
      //     icon: 'ios-alarm'
      //   },
      //   {
      //     title: '3',
      //     name: 'menu3',
      //     icon: 'ios-alarm',
      //     children: [{
      //       title: '1-1',
      //       name: 'menu11',
      //       icon: 'ios-alarm'
      //     }, {
      //       title: '1-2',
      //       name: 'menu12',
      //       icon: 'ios-alarm',
      //       children: [{
      //         title: '1-2-1',
      //         name: 'menu121',
      //         icon: 'ios-alarm'
      //       }, {
      //         title: '1-2-2',
      //         name: 'menu122',
      //         icon: 'ios-alarm'
      //       }]
      //     }]
      //   }
      // ]
    };
  },
  computed: {
    ...mapState({
      tabList: state => state.tabNav.tabList,
      routers: state =>
        state.router.routers.filter(item => {
          return item.path !== "*" && item.name !== "login";
        })
    }),
    triggerClasses() {
      return ["trigger-icon", this.collapsed ? "rotate" : ""];
    }
  },
  methods: {
    ...mapActions(["handleRemove"]),
    handleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    handleClickTab(id) {
      let route = getRouteById(id);
      this.$router.push(route);
    },
    handleTabRemove(id, event) {
      event.stopPropagation();
      this.handleRemove({
        id,
        $route: this.$route
      }).then(nextRoute => {
        this.$router.push(nextRoute);
      });
    },
    labelRender(item) {
      return h => {
        return (
          <div>
            <span>{item.meta.title}</span>
            <icon
              nativeOn-click={this.handleTabRemove.bind(
                this,
                getTabNameByRoute(item)
              )}
              type="md-close-circle"
              style="line-height:10px;"
            ></icon>
          </div>
        );
      };
    }
  }
};
</script>

<style lang="scss">
.layout-wrapper,
.layout-outer {
  height: 100%;
  .header-wrapper {
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0 23px;
    .trigger-icon {
      cursor: pointer;
      transition: transform 0.3s ease;
      &.rotate {
        transform: rotateZ(-90deg);
        transition: transform 0.3s ease;
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
