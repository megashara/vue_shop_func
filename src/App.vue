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
@import '../node_modules/typeface-roboto/index.css';
@import "./assets/styles/app.scss";
</style>
