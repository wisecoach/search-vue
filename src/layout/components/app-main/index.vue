<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import {mocktest} from '@/api/passport'

export default {
  name: "index",
  data(){
    return {
    }
  },
  methods: {
    handleClick(){
      mocktest().then(res=>{
        this.ret = res.data
      })
    }
  },
  computed: {
    cachedViews(){
      return this.$store.state.tags.cached_views
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.app-main {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  padding-top: 10px;
}



</style>
