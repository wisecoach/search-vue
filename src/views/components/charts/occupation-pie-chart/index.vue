<template>
  <div style="position:relative;">
    <el-button @click="handleBack" :disabled="level<1" class="back-button" size="mini">返回上一级</el-button>
    <div ref="chart" :style="{width: width, height: height}" />
  </div>
</template>

<script>
import echarts from "echarts";
import {chart_theme_options} from "@/settings-options";
import {getOccupation, getOccupationChildren} from '@/api/occupation'

export default {
  name: "occupation-pie-chart",
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
  },
  data(){
    return {
      chart: null,
      data: [
        {value: 1048, name: '搜索引擎', id: 100},
        {value: 735, name: '直接访问', id: 3},
        {value: 580, name: '邮件营销', id: 4},
        {value: 484, name: '联盟广告', id: 5},
        {value: 300, name: '视频广告', id: 6}
      ],
      tree: new Map(),
      pid: 0,
      level: 1,
    }
  },
  methods: {
    init(){
      this.tree.set(0, {id: 0, pid: -1, name: '不限', value: 0, level: 0, children: null})
      this.changeNode(0)
      this.initChart()
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, chart_theme_options[this.theme])
      this.chart.setOption(this.option, true)
      this.chart.on('click', (params) => {
        if(this.level < 2){
          this.changeNode(this.data[params.dataIndex].id)
        }
      })
    },
    setOptions() {
      this.chart.clear()
      this.chart.setOption(this.option, true)
    },
    getOccupations(id){
      let node = this.tree.get(id)
      if (node && node.children) {
        return
      } else {
        if (node) {
          getOccupationChildren(node.id).then(res => {
            if (res.data.code === 100) {
              node.children = []
              let occupations = res.data.data
              occupations.map(item => {
                let child = {
                  id: item.id,
                  value: item.count,
                  name: item.name,
                  level: item.level,
                  pid: item.pid
                }
                this.tree.set(item.id, child)
                node.children.push(item.id)
              })
              this.changeNode(id)
            }
          })
        }
      }
    },
    changeNode(id){
      let node = this.tree.get(id)
      if (node && node.children){
        this.data = []
        node.children.map(item => {
          let child = this.tree.get(item)
          this.data.push(child)
        })
        this.level = node.level
        this.pid = node.pid
        this.setOptions()
      } else {
        this.getOccupations(id)
      }
    },
    handleBack(){
      this.changeNode(this.pid)
    }
  },
  computed: {
    theme: function (){
      return this.$store.state.settings.theme
    },
    option() {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '职业',
            type: 'pie',
            radius: '50%',
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    option: {
      handler(){
        this.setOptions()
      }
    },
    theme() {
      if (this.chart) {
        this.chart.dispose()
      }
      this.initChart()
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.back-button {
  position:absolute;
  z-index: 500;
  right: 20px;
}

</style>
