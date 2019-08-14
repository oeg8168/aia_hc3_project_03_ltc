<template>
  <div id="app">
    <demo></demo>
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
</style>
