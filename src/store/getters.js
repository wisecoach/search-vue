const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state=>state.tags.visited_views,
  cachedViews: state=>state.tags.cached_views,
  token: state => state.user.token,
  photo: state => state.user.user.photo,
  name: state => state.user.user.name,
  role: state => state.user.role,
  sidebarRouters: state => state.user.sidebarRouters
}
export default getters
