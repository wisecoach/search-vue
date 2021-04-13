const state = {
  visited_views: [],
  cached_views: [],
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visited_views.some(v => v.path === view.path)) return
    state.visited_views.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cached_views.includes(view.path)) return
    state.cached_views.push(view.path)
  },

  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visited_views.entries()) {
      if (v.path === view.path) {
        state.visited_views.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cached_views.indexOf(view.path)
    index > -1 && state.cached_views.splice(index, 1)
  }
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: state.visited_views,
        cachedViews: state.cached_views
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve(state.visited_views)
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve(state.cached_views)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
