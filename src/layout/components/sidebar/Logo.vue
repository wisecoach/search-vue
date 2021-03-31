<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <hamburger class="hamburger-container" :is-active="collapse" @toggleClick="toggleClick"/>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <i class="iconfont logo">&#xe645;</i>
        <div class="logo-title">{{title}}</div>
        <hamburger class="hamburger-container" :is-active="collapse" @toggleClick="toggleClick"/>
      </router-link>
    </transition>
  </div>
</template>

<script>
import variables from '@/assets/styles/variables.scss'
import Hamburger from "@/components/hamburger";
import {mapGetters} from "vuex";

export default {
  name: 'SidebarLogo',
  components: {Hamburger},
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
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

  .logo {
    font-size: 20px;
    margin-right: 10px;
  }

  .logo-title {
    font-size: 16px;
    display: inline-block;
  }

  &.collapse {

  }
}
</style>
