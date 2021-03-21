import store from '@/store'

const { body } = document
/* 宽度小于该值就会被视为手机 */
const WIDTH = 992

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened){
        store.dispatch('app/closeSideBar', {withoutAnimation: true})
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
    /* 此处必须得在mounted之前执行，否则会看到关闭的过程 */
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  // mounted() {
  //   const isMobile = this.$_isMobile()
  //   if (isMobile) {
  //     store.dispatch('app/toggleDevice', 'mobile')
  //     store.dispatch('app/closeSideBar', { withoutAnimation: false })
  //   }
  // },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
