<template>
  <div class="detail">
    <info-base :employee="employee" />
    <el-card>
      <template slot="header">
        员工履历
      </template>
      <career-base :careers="careers" />
    </el-card>
    <el-card>
      <template slot="header">
        总体评分
      </template>
      <div v-if="validScore">
        <score-rate :score="avgScore" />
        <ap-rate :score="apScore" />
      </div>
      <div style="text-align: center" v-else>
        暂时还没有记录哦~
      </div>
    </el-card>
    <el-card>
      <template slot="header">
        违例事件
      </template>
      <crimes :crimes="crimes" />
    </el-card>
  </div>
</template>

<script>
import {searchAllCareerbyEmpid, searchAllAvgbyEmpid, searchAllCrimebyEmpid} from '@/api/career'
import {searchInfobyId} from '@/api/info'
import InfoBase from "@/views/components/info/info-base";
import CareerBase from "@/views/components/info/career-base";
import ScoreRate from "@/views/components/info/score-rate";
import ApRate from "@/views/components/info/ap-rate";
import Crimes from "@/views/components/info/crimes"

export default {
  name: "detail",
  components: {ApRate, ScoreRate, CareerBase, InfoBase, Crimes},
  data(){
    return {
      id: null,
      employee: {},
      careers: [],
      avgScore: null,
      crimes: [],
      validScore: true
    }
  },
  methods: {
    init(){
      this.id = this.$route.params.id
      this.getEmployee()
      this.getCareers()
      this.getAvgScore()
      this.getCrimes()
    },
    getEmployee(){
      searchInfobyId(this.$route.params.id).then(res => {
        if (res.data.code === 100) {
          this.employee = res.data.data
        }
      })
    },
    getCareers(){
      searchAllCareerbyEmpid(this.id).then(res => {
        if (res.data.code === 100) {
          this.careers = res.data.data
        }
      })
    },
    getAvgScore(){
      searchAllAvgbyEmpid(this.id).then(res => {
        if (res.data.code === 100) {
          this.avgScore = res.data.data
          this.avgScore.attitude /= 20
          this.avgScore.ability /= 20
        }
      })
    },
    getCrimes(){
      searchAllCrimebyEmpid(this.id).then(res => {
        if (res.data.code === 100) {
          this.crimes = res.data.data
        }
      })
    },
  },
  computed: {
    apScore(){
      let attendanceList = []
      let performanceList = []
      let avgAttendance = 0
      let avgPerformance = 0
      this.careers.map((item) => {
        if (item.attendance != null) {
          attendanceList.push(item.attendance)
          avgAttendance += item.attendance
        }
        if (item.performance != null) {
          performanceList.push(item.performance)
          avgPerformance += item.performance
        }
      })
      if (attendanceList.length == 0 || performanceList.length == 0) {
        this.validScore = false
      }else{
        this.validScore = true
        avgAttendance /= attendanceList.length * 20
        avgPerformance /= performanceList.length * 20
      }
      return {
        attendances: attendanceList,
        performances: performanceList,
        avgAttendance: avgAttendance,
        avgPerformance: avgPerformance
      }
    }
  },
  watch: {
    apScore: function () {

    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 50px;
}



</style>
