<template>
  <div>
    <el-card>
      <template slot="header">
        经历信息
      </template>
      <career-detail :career="employeeCareer" />
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
        违例记录
      </template>
      <crimes :crimes="crimes" />
    </el-card>
    <el-card>
      <template slot="header">
        员工评价
      </template>
      <comments :id="id"/>
    </el-card>
  </div>
</template>

<script>

import {
  searchCareerbyCarid,
  searchThisCrimebycarid,
  searchThisPerformancebyCarid,
  searchAttendancebyCarId,
  searchThisAvgbyCarid,
} from '@/api/career'
import {searchInfobyId} from '@/api/info'
import CareerDetail from "@/views/components/info/career-detail";
import ScoreRate from "@/views/components/info/score-rate";
import ApRate from "@/views/components/info/ap-rate";
import Crimes from "@/views/components/info/crimes";
import Comments from "@/views/components/info/comments";

export default {
  name: "career",
  components: {Crimes, ApRate, ScoreRate, CareerDetail, Comments},
  data(){
    return {
      id: null,
      empid: null,
      employee: null,
      career: null,
      attendances: [],
      performances: [],
      crimes: [],
      avgScore: null,
      validScore: true
    }
  },
  computed: {
    apScore(){
      let attendanceList = []
      let performanceList = []
      let avgAttendance = 0
      let avgPerformance = 0
      this.attendances.map((item) => {
        if (item.attendance != null) {
          attendanceList.push(item.attendance)
          avgAttendance += item.attendance
        }
      })
      this.performances.map((item) => {
        if (item.performance != null) {
          performanceList.push(item.performance)
          avgPerformance += item.performance
        }
      })
      if (attendanceList.length === 0 || performanceList.length === 0) {
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
    },
    employeeCareer(){
      if (this.employee && this.career){
        const career = {
          ...this.career,
          employee: this.employee
        }
        return career
      }
    }
  },
  methods: {
    init(){
      this.id = Number(this.$route.params.carid)
      this.empid = this.$route.params.id
      this.getCareer()
      this.getEmployee()
      this.getAvgScore()
      this.getAttendace()
      this.getPerformance()
      this.getCrimes()
    },
    getCareer(){
      searchCareerbyCarid(this.id).then(res=>{
        if(res.data.code === 100){
          this.career = res.data.data
        }
      })
    },
    getEmployee(){
      searchInfobyId(this.empid).then(res=>{
        if(res.data.code === 100){
          this.employee = res.data.data
        }
      })
    },
    getAvgScore() {
      searchThisAvgbyCarid(this.id).then(res=>{
        if(res.data.code === 100){
          this.avgScore = res.data.data
          this.avgScore.ability /= 20
          this.avgScore.attitude /= 20
        }
      })
    },
    getPerformance(){
      searchThisPerformancebyCarid(this.id).then(res=>{
        if(res.data.code === 100){
          this.performances = res.data.data
        }
      })
    },
    getAttendace(){
      searchAttendancebyCarId(this.id).then(res=>{
        if(res.data.code === 100){
          this.attendances = res.data.data
        }
      })
    },
    getCrimes() {
      searchThisCrimebycarid(this.id).then(res=>{
        if(res.data.code === 100){
          this.crimes = res.data.data
        }
      })
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
  margin-bottom: 20px;
}
</style>
