<template>
  <div id="app" :class="theme" :style="{'--current-color': theme_color}">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { theme_options } from '@/settings-options'

export default {
  name: 'App',
  data(){
    return {
      theme_options: theme_options
    }
  },
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      theme_color: state => state.settings.theme_color
    })
  },
  methods: {
    change(){
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: ''
      })
    }
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
//滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  width: 10px;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #919399;
  width: 10px;
  border-radius: 5px;
}
</style>
