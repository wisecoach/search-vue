import {login, logout} from '@/api/passport'

const user = {
  state: {
    sessionId: '',
    name: '',
    photo: '',
    role: '',
    remeber_me: false
  },

  mutations: {
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_REMEBER: (state, remeberMe) => {
      state.remeber_me = remeberMe
    }
  },

  actions: {
    Login({commit}, userInfo){
      return new Promise((resolve, reject) => {
        login(...userInfo).then(res => {

        })
      })
    }
  }
}

export default user
