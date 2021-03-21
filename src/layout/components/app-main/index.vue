<template>
  <div class="app-main">
    app-main
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.app-main {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: #E65D6E;
  overflow-x: hidden;
}

.fixed-header + .app-main {
  padding-top: $navbar-height;
}

.has-tags {
  .app-main {
    padding-top: $tags-height;
  }

  .fixed-header + .app-main {
    padding-top: $navbar-height + $tags-height;
  }
}

</style>
