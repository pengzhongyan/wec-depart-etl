<template>
  <div id="app">
    <component :is="componentName" :default-path="defaultPath" :menus="menus"></component>
  </div>
</template>
<script>
// import NavWrapper from "iview-comps/components/nav-wrapper/navWrapper.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    // NavWrapper
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["menus", "defaultPath"]),
    componentName() {
      return process.env.NODE_ENV === "production"
        ? "wContentView"
        : "wNavWrapper";
    }
  }
};
</script>

<style lang="stylus" scoped>
#app {
  .router-link-exact-active {
    color: #1873e0
  }
  >>>.app-content {
    position: relative
    min-width: 1008px
  }
  >>>.app-menu {
    overflow-y: auto
  }
}
</style>