<template>
  <div>
    <el-button @click="addOccupation">
      新增职业
    </el-button>
    <div ref="chart" :style="{height:'350px',width:'800px'}">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  name: 'line-chart',
  props: {
  },
  data() {
    return {
      chart: null,
      legends: ['职业i'],
      series: [{
        name: '职业i',
        type: 'line',
        data: [1,2,3,4,5,6]
      }]
    }
  },
  watch: {
    option: {
      handler(){
        this.setOptions()
      }
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
    option:function (){
      return {
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
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
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.setOptions(this.option)
    },
    setOptions() {
      this.chart.clear()
      this.chart.setOption(this.option, true )
    },
    addOccupation(){
      let legend = '职业i'
      let seriesObj = {
        name: legend,
        type: 'line',
        data: [1,2,3,4,5,6,7]
      }
      this.legends.push(legend)
      this.series.push(seriesObj)
      console.log(this.option)
    }
  }
}
</script>
