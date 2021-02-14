<template>
  <div id="app">
    <VMainWrapper msg="Каталог книг" />
  </div>
</template>

<script>
import VMainWrapper from "./components/VMainWrapper.vue";

export default {
  name: "App",
  components: {
    VMainWrapper
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
