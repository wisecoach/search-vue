<template>
  <div class="ap-rate">
    <el-col :span="12">
      <el-card class="attendance-card">
        <div slot="header">
          考勤水平
        </div>
        <el-rate v-model="score.avgAttendance"
                 :disabled="disable"
                 :max="5"
                 show-text
                 text-color="#ff9900"
        >
        </el-rate>
        <el-card class="chart-card">
          <div :style="{width: '100%', height: '350px'}" ref="achart"></div>
        </el-card>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="performance-card">
        <div slot="header">
          业绩水平
        </div>
        <el-rate v-model="score.avgPerformance"
                 :disabled="disable"
                 :max="5"
                 show-text
                 text-color="#ff9900"
        >
        </el-rate>
        <el-card class="chart-card">
          <div :style="{width: '100%', height: '350px'}" ref="pchart"></div>
        </el-card>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import echarts from 'echarts'
import {chart_theme_options} from '@/settings-options'
import {formDateBeforeList} from "@/utils/date";

export default {
  name: "ap-rate",
  props: {
    score: {
      type: Object
    },
    disable: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      achart: null,
      pchart: null,
    }
  },
  methods: {
    initChart(){
      this.achart = echarts.init(this.$refs.achart, chart_theme_options[this.theme])
      this.pchart = echarts.init(this.$refs.pchart, chart_theme_options[this.theme])
      this.achart.setOption(this.aOption)
      this.pchart.setOption(this.pOption)
    },
    disposeChart(){
      if (this.achart != null) {
        this.achart.dispose()
      }
      if (this.pchart != null) {
        this.pchart.dispose()
      }
    }
  },
  computed: {
    theme: function (){
      return this.$store.state.settings.theme
    },
    aOption: function (){
      return {
        title: {
          text: '员工的考勤折线图',
          y: 'top',
          x: 'center',
          padding: 10
        },
        xAxis: {
          type: 'category',
          name: '距今的第x次记录',
          data: Array(this.score.attendances.length).fill(0).map((item, i) => {
            return this.score.attendances.length-i
          }),
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            showMaxLabel: true
          },
          nameLocation: 'middle',
          nameTextStyle: {
            padding: [10,0,0,0]
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 30,
          top: 50,
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
          data: "考勤"
        },
        series: {
            name: "考勤",
            type: "line",
            data: this.score.attendances.map((item)=>{
              return item.toFixed(2)
            })
        }
      }
    },
    pOption: function (){
      return {
        title: {
          text: '员工的业绩折线图',
          y: 'top',
          x: 'center',
          padding: 10
        },
        xAxis: {
          type: 'category',
          name: '距今的第x次记录',
          data: Array(this.score.performances.length).fill(0).map((item, i) => {
            return this.score.performances.length-i
          }),
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            showMaxLabel: true
          },
          nameLocation: 'middle',
          nameTextStyle: {
            padding: [10,0,0,0]
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 30,
          top: 50,
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
          data: "业绩"
        },
        series: {
          name: "业绩",
          type: "line",
          data: this.score.performances.map((item)=>{
            return item.toFixed(2)
          })
        }
      }
    }
  },
  mounted(){
    setTimeout(()=>{
      this.initChart()
    }, 200)
  },
  watch: {
    theme(){
      this.disposeChart()
      this.initChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.ap-rate {

}

.attendance-card,.performance-card {
  margin: 5px 5px 25px;
  height: 600px;

  .chart-card {
    height: 400px;
    padding: 0 20px;
  }
}

.el-rate {
  padding-bottom: 66px;
}

::v-deep .el-rate__icon,.el-rate__item{
  font-size: 36px;
}
</style>
