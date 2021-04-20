<template>
  <div :class="classObj" class="app-wrapper" :style="{color: theme_color}">
    <sidebar v-if="device === 'desktop' || sidebar.opened" class="sidebar-container" />
    <div class="main-container" :class="{'has-tags': needTagsView}">
      <div class="header-container" :class="{'fixed-header': fixedHeader}">
        <navbar />
        <tags />
      </div>
      <div class="app-container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import {AppMain, Sidebar, Navbar, Tags} from './components'
import { mapState } from 'vuex'
import ResizeMixin from './mixin/resize-handler'

export default {
  name: "index",
  components: {
    AppMain,
    Sidebar,
    Navbar,
    Tags
  },
  mixins: [ResizeMixin],
  data(){
    return {
    }
  },
  methods: {
    handle(){
    }
  },
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      theme_color: state => state.settings.theme_color,
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.show_settings,
      needTagsView: state => state.settings.tags,
      fixedHeader: state => state.settings.fixed_header
    }),
    classObj(){
      return {
        'open-sidebar': this.sidebar.opened,
        'without-animation': this.sidebar.withoutAnimation,
        'mobile': this.device === 'mobile',
        'hide-sidebar': !this.sidebar.opened
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper{
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.open-sidebar {
    position: fixed;
    top: 0;
  }
}


</style>
