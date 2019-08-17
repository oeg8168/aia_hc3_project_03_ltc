<template>
  <div id="app">
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
