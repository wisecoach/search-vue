<template>
  <div>
    <occupation-picker @select="handleSelect" style="display: inline-block"></occupation-picker>
    <el-button @click="handleAddOccupation" :disabled="!selected">
      确认
    </el-button>
    <div ref="chart" :style="{height:'300px',width:'100%'}">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {chart_theme_options} from '@/settings-options'
import {getAmount} from '@/api/chart'
import {formDateBeforeList} from '@/utils/date'
import OccupationPicker from '@/components/occupation-picker'

export default {
  name: 'line-chart',
  components: {OccupationPicker},
  props: {
  },
  data() {
    return {
      chart: null,
      legends: [],
      series: [],
      selected: false,
      occid: 0,
      size: 7
    }
  },
  watch: {
    option: {
      handler(){
        this.setOptions()
      }
    },
    theme(){
      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(this.$refs.chart, chart_theme_options[this.theme])
      this.setOptions()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  computed: {
    theme: function (){
      return this.$store.state.settings.theme
    },
    option:function (){
      return {
        title: {
          text: '市场在职人数折线图',
          y: 'bottom',
          x: 'center',
          padding: 0
        },
        xAxis: {
          data: formDateBeforeList(this.size, 'MM-dd', 'd'),
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            showMaxLabel: true
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: this.legends
        },
        series: this.series
      }
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, chart_theme_options[this.theme])
      this.chart.setOption(this.option, true )
    },
    setOptions() {
      this.chart.clear()
      this.chart.setOption(this.option, true )
    },
    handleAddOccupation(){
      this.selected = false
      getAmount(this.occid).then(res => {
        let body = res.data
        if (body.code === 100){
          let data = body.data
          let legend = data.occupation.name
          let seriesObj = {
            name: legend,
            type: 'line',
            data: data.series
          }
          this.legends.push(legend)
          this.series.push(seriesObj)
          this.setOptions()
        }
      })
    },
    handleSelect(val){
      this.selected = true
      this.occid = val
    }
  }
}
</script>
