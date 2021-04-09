<template>
  <div class="sidebar-container">
    <logo :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :default-active="activeMenu"
        :active-text-color="theme_color"
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
    ...mapState({
      theme_color: state => state.settings.theme_color
    }),
    ...mapGetters(['sidebar', 'sidebarRouters']),
    activeMenu: function () {
      const route = this.$route;
      let {meta, path} = route;
      const splits = path.split("/")
      let newSplits = []
      for (let split of splits) {
        if (isNaN(Number(split)) && split !== "") {
          newSplits.push(split)
        }
      }
      const newPath = "/" + newSplits.join("/")
      return newPath;
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
