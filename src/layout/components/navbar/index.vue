<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :is-active="collapse" @toggleClick="toggleClick"/>
    <breadcrumb />
    <div class="right-menu">
      <el-popover trigger="click" class="right-menu-item appearance">
        <svg-icon icon-class="clothes" slot="reference"></svg-icon>
        <div class="theme-setting">
          <h3 style="font-weight: bold">
            主题风格选择
          </h3>
          <div class="setting-checbox-group">
            <div class="setting-checbox">
            <div class="setting-checbox-item" @click="changeTheme(theme_options.standard)">
              <img src="@/assets/images/theme-standard-icon.png" alt="standard">
              <div v-if="theme === theme_options.standard" class="setting-checbox-selectIcon" style="display: block;">
                <i aria-label="图标: check" class="anticon anticon-check">
                  <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="themeColor" aria-hidden="true"
                       focusable="false" class="">
                    <path
                      d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/>
                  </svg>
                </i>
              </div>
              <div class="theme-desc">standard</div>
            </div>
            <div class="setting-checbox-item" @click="changeTheme(theme_options.light)">
              <img src="@/assets/images/theme-light-icon.png" alt="light">
              <div v-if="theme === theme_options.light" class="setting-checbox-selectIcon" style="display: block;">
                <i aria-label="图标: check" class="anticon anticon-check">
                  <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="themeColor" aria-hidden="true"
                       focusable="false" class="">
                    <path
                      d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/>
                  </svg>
                </i>
              </div>
              <div class="theme-desc">light</div>
            </div>
            <div class="setting-checbox-item" @click="changeTheme(theme_options.dark)">
              <img src="@/assets/images/theme-dark-icon.png" alt="dark">
              <div v-if="theme === theme_options.dark" class="setting-checbox-selectIcon" style="display: block;">
                <i aria-label="图标: check" class="anticon anticon-check">
                  <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="themeColor" aria-hidden="true"
                       focusable="false" class="">
                    <path
                      d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/>
                  </svg>
                </i>
              </div>
              <div class="theme-desc">dark</div>
            </div>
          </div>
          </div>
        </div>
        <div class="color-setting">
          <div class="picker">
            <theme-picker @change="changeThemeColor" />
          </div>
          <h3 style="font-weight: bold">主题颜色修改</h3>
        </div>
        <div class="appearance-init">
          <el-button @click="initTheme">重置主题</el-button>
        </div>
      </el-popover>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :src="photo" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            查看个人详细信息
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
import Breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'
import {mapGetters, mapState} from 'vuex'


export default {
  name: "navbar",
  components: {
    ThemePicker, Breadcrumb, Hamburger
  },
  data(){
    return {
      theme_options
    }
  },
  methods: {
    toggleClick(){
      this.$store.dispatch('app/toggleSideBar')
    },
    toggleSideBar(){
      this.$store.dispatch('app/toggleSideBar')
    },
    changeTheme(val){
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    },
    changeThemeColor(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme_color',
        value: val
      })
    },
    initTheme(){
      this.$store.dispatch('settings/initDefault')
    },
    logout(){
      this.$store.dispatch('Logout').then(res => {
        if (res.data.code === 205) {
          this.$store.dispatch('InitDefault').then(()=>{
            this.$router.go(0)
          })
        }
      })
    }
  },
  computed: {
    ...mapState({
      theme: state => state.settings.theme,
      themeColor: state => state.settings.theme_color
    }),
    ...mapGetters([
      'photo',
      'device',
      'sidebar'
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
    },
    collapse(){
      return this.sidebar.opened == 0
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
  -webkit-box-shadow: 0px 1px 2px 0px #A0A0A0;
  box-shadow: 0px 1px 2px 0px #A0A0A0;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
  }

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

    .appearance {
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }

}

.theme-setting {
  width: 350px;
  height: 200px;
  padding: 25px;
}

.color-setting {
  width: 350px;
  height: 100px;
  padding: 25px;

  .picker {
    float: right;
    margin-right: 30px;
  }
}

.appearance-init {
  text-align: center;
  padding-bottom: 20px;
}

.setting-checbox-group {
  margin: 20px 10px;
}

.setting-checbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;

  .setting-checbox-item {
    width: 60px;
    position: relative;
    margin-right: 42px;
    border-radius: 2px;
    cursor: pointer;

    img {
      width: 60px;
      height: 60px;
    }

    .setting-checbox-selectIcon {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding-top: 24px;
      padding-left: 26px;
      color: #1890ff;
      font-weight: 700;
      font-size: 14px;
    }

    .theme-desc {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
