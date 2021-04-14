<template>
  <div class="tags-container" id="tags-container">
    <scroll-pane ref="scrollPane" class="tags-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        :class="isActive(tag)?'active':''"
        :style="isActive(tag)?activeTagStyle():tagStyle()"
        class="tags-item">
        {{tag.title}}
        <span v-if="tag.path!='/index'" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from './scroll-pane'
import {mapState} from 'vuex'
import {theme_options} from '@/settings-options'

export default {
  name: "index",
  components: {ScrollPane},
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    ...mapState({
      visitedViews: state => state.tags.visited_views,
      theme: state => state.settings.theme,
      themeColor: state => state.settings.theme_color,
    }),
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    tagStyle() {
      let color = ''
      let bgcolor = ''
      let bdcolor = ''
      switch (this.theme) {
        case theme_options.standard:
          color = this.themeColor;
          bgcolor = '#FFF';
          bdcolor = this.themeColor;
          break;
        case theme_options.light:
          color = this.themeColor;
          bgcolor = '#FFF';
          bdcolor = this.themeColor;
          break;
        case theme_options.dark:
          color = '#FFF';
          bgcolor = '#303133';
          bdcolor = '#FFF';
          break;
      }
      return {
        "color": color,
        "background-color": bgcolor,
        "border-color": bdcolor
      }
    },
    activeTagStyle(){
      let color = ''
      let bgcolor = ''
      let bdcolor = ''
      switch (this.theme) {
        case theme_options.standard:
          color = '#FFF';
          bgcolor = this.themeColor;
          bdcolor = '#FFF';
          break;
        case theme_options.light:
          color = '#FFF';
          bgcolor = this.themeColor;
          bdcolor = '#FFF';
          break;
        case theme_options.dark:
          color = '#FFF';
          bgcolor = this.themeColor;
          bdcolor = '#FFF';
          break;
      }
      return {
        "color": color,
        "background-color": bgcolor,
        "border-color": bdcolor
      }
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        if (view.name === 'Dashboard') {
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tags/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    addTag() {
      this.$store.dispatch('tags/addView', this.$route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
  },
  mounted() {
    this.addTag()
  },
  watch: {
    $route() {
      this.addTag()
      this.moveToCurrentTag()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.tags-container {
  height: $tags-height;
  width: 100%;

  .tags-wrapper {
    .tags-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border-right: 1px solid;
      border-bottom: 1px solid;
      padding: 0 8px;
      font-size: 12px;
      margin-top: 5px;
      &:first-of-type {
        margin-left: 15px;
        border-left: 1px solid;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        border-top: 1px solid;
        border-bottom: 1px solid;

        &::before {
          content: '';
          background-color: #FFFFFF;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }

    }
  }
}
</style>
