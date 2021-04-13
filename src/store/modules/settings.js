import Cookies from 'js-cookie'
import settingsDefault from '@/settings-default'
import variables from '@/assets/styles/element-ui.scss'

const {theme, showSettings, tags, fixedHeader} = settingsDefault

const state = {
  theme: Cookies.get('theme') || theme,
  theme_color: Cookies.get('theme_color') || variables.theme_color,
  show_settings: Cookies.get('show_settings') || showSettings,
  tags: Cookies.get('tags') || tags,
  fixed_header: Cookies.get('fixed_header') || fixedHeader
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      Cookies.set(key, value)
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  initDefault({commit}) {
    return new Promise((resolve) => {
      let defaultData = [
        {key: 'theme', value:theme},
        {key: 'theme_color', value:variables.theme_color},
        {key: 'show_settings', value:showSettings},
        {key: 'tags', value:tags},
        {key: 'fixed_header', value:fixedHeader},
      ]
      defaultData.map((item) => {
        commit('CHANGE_SETTING', item)
      })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
