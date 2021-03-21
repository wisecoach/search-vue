<template>
  <div class="navbar">
    <el-button @click="toggleSideBar">隐藏/打开侧边栏</el-button>
    <el-button type="primary" @click="changeTheme('theme-standard')">修改主题为standard</el-button>
    <el-button @click="changeTheme('theme-light')">修改主题为light</el-button>
    <el-button @click="changeTheme('theme-dark')">修改主题为dark</el-button>
    <div>
      <theme-picker @changeTheme="handleChangeTheme" />
    </div>
  </div>
</template>

<script>
import {theme_options} from '@/settings-options'
import ThemePicker from '@/components/ThemePicker'


export default {
  name: "navbar",
  components: {
    ThemePicker
  },
  methods: {
    toggleSideBar(){
      this.$store.dispatch('app/toggleSideBar')
    },
    changeTheme(val){
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    },
    handleChangeTheme(val) {
      alert('sss')
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme_color',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.navbar{
  height: $navbar-height;
  background: #409EFF;
}

</style>
