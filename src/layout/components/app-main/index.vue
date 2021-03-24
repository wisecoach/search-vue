<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script>
import {mocktest} from '@/api/passport'

export default {
  name: "index",
  data(){
    return {
      ret: ''
    }
  },
  methods: {
    handleClick(){
      mocktest().then(res=>{
        this.ret = res.data
      })
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
}



</style>
