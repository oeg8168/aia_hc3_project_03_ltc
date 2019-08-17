<template>
  <div id="app">
    <b-navbar type="dark"
              variant="info"
              :sticky="true">
      <b-navbar-brand to="/">
        <font-awesome-icon icon="rocket" />&nbsp;{{ $t("PAGE.Title") }}
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/demo">{{ $t("PAGE.NAV.Demo") }}</b-nav-item>
        <b-nav-item to="/about">{{ $t("PAGE.NAV.About") }}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Demo from "./components/Demo.vue";

export default {
  name: "app",
  components: { Demo }
};
</script>

<style lang="scss">
#app {
  font-family: "微軟正黑體", "Microsoft JhengHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
