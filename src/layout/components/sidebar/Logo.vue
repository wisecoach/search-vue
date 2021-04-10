<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" class="sidebar-logo-link">
        <hamburger class="hamburger-container" :is-active="collapse" @toggleClick="toggleClick"/>
      </div>
      <div v-else class="sidebar-logo-link">
        <router-link to="/" style="display: inline-block;width: 120px">
          <i class="iconfont logo">&#xe645;</i>
          <div class="logo-title">{{title}}</div>
        </router-link>
        <hamburger class="hamburger-container" :is-active="collapse" @toggleClick="toggleClick"/>
      </div>
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


  &.collapse {

  }
}


.logo {
  font-size: 20px;
  margin-right: 10px;
}

.logo-title {
  font-size: 16px;
  display: inline-block;
}

</style>
