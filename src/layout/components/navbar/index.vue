<template>
  <div class="navbar">
    <el-button type="primary" @click="toggleSideBar">隐藏/打开侧边栏</el-button>
    <el-button type="primary" @click="changeTheme('theme-standard')">修改主题为standard</el-button>
    <el-button type="primary" @click="changeTheme('theme-light')">修改主题为light</el-button>
    <el-button type="primary" @click="changeTheme('theme-dark')">修改主题为dark</el-button>
    <theme-picker @change="handleChangeTheme" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="photo" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {logout} from '@/api/passport'
import {theme_options} from '@/settings-options'
import ThemePicker from '@/components/theme-picker'
import {mapGetters} from 'vuex'


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
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme_color',
        value: val
      })
    }
  },
  computed: {
    ...mapGetters([
      'photo',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.navbar {
  height: $navbar-height;
  overflow: hidden;
  position: relative;
  -webkit-box-shadow: 0px 1px 2px 0px #cdcdcd;
  box-shadow: 0px 1px 2px 0px #cdcdcd;


  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
