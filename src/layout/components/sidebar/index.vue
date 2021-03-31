<template>
  <div class="sidebar-container">
    <logo :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :default-active="activeMenu"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import Hamburger from '@/components/hamburger'
import Logo from './Logo'
import SidebarItem from "./SidebarItem";

export default {
  name: "sidebar",
  components: { Hamburger,Logo,SidebarItem },
  computed: {
    ...mapState('settings'),
    ...mapGetters(['sidebar', 'sidebarRouters']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      return path;
    },
    isCollapse(){
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleClick(){
      this.$store.dispatch('app/toggleSideBar')
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.scrollbar-wrapper {
  margin-top: 100px;
  top: 100px;
}

.logo{
  transition: display $transition-period;
  font-size: 40px;
  height: $navbar-height;
  line-height: $navbar-height;
}
</style>
