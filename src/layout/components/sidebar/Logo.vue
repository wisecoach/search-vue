<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" class="sidebar-logo-link">
        <router-link to="/" style="display: inline-block;width: 54px">
          <div class="logo-bar">
            <div class="svg-container">
              <svg-icon style="font-size: 30px;" icon-class="logo" />
            </div>
          </div>
        </router-link>
      </div>
      <div v-else class="sidebar-logo-link">
        <router-link to="/" style="display: inline-block;width: 120px">
          <div class="logo-bar">
            <div class="svg-container">
              <svg-icon style="font-size: 30px;" icon-class="logo" />
            </div>
            <div class="logo-title">{{title}}</div>
          </div>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import variables from '@/assets/styles/variables.scss'
import Hamburger from "@/components/hamburger";
import SvgIcon from "@/components/svg-icon"
import {mapGetters} from "vuex";

export default {
  name: 'SidebarLogo',
  components: {Hamburger, SvgIcon},
  methods: {
    toggleClick(){
      this.$store.dispatch('app/toggleSideBar')
    }
  },
  computed: {
    variables() {
      return variables;
    },
    sideTheme() {
      return this.$store.state.settings.sideTheme
    },
    collapse(){
      return !this.$store.state.app.sidebar.opened
    }
  },
  data() {
    return {
      title: '斯尔奇',
    }
  }
}
</script>

<style lang="scss" scoped>

@import "~@/assets/styles/variables.scss";

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $navbar-height;
  line-height: $navbar-height;
  text-align: center;
  overflow: hidden;


  &.collapse {

  }
}

.logo-bar{
  width: 100%;
  height: 54px;
  text-align: center;
  vertical-align: middle;
}

.svg-container {
  display: inline-block;
  width: 54px;
  height: 54px;
  padding-top: 6px;
  padding-left: 12px;
}

.logo {
  font-size: 20px;
  margin-right: 10px;
}

.logo-title {
  margin-left: 5px;
  display: inline-block;
  height: 54px;
  font-size: 20px;
}

</style>
