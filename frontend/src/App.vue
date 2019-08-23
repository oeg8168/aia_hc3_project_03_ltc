<template>
  <div id="app">
    <b-navbar type="dark"
              variant="info"
              class="flex-wrap font-weight-bold mb-3"
              :sticky="true">
      <b-navbar-brand to="/"
                      class="text-wrap">
        <font-awesome-icon icon="rocket" />&nbsp;
        <span class="d-md-none">{{ $t("PAGE.NAV.BRAND.SHORT") }}</span>
        <span class="d-none d-md-inline">{{ $t("PAGE.NAV.BRAND.FULL")}} </span>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/intro">{{ $t("PAGE.NAV.Intro") }}</b-nav-item>
        <b-nav-item to="/demo">{{ $t("PAGE.NAV.Demo") }}</b-nav-item>
        <b-nav-item to="/about">{{ $t("PAGE.NAV.About") }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Demo from "./components/Demo.vue";

export default {
  name: "app",
  components: { Demo },
  created: function() {
    document.title = this.$t("PAGE.Title");
  }
};
</script>

<style lang="scss">
body {
  font-family: "微軟正黑體", "Microsoft JhengHei", "Avenir", Helvetica, Arial, sans-serif;

  user-select: none;
  overflow-y: scroll;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar {
  z-index: 3000;
}

.el-card__body {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
