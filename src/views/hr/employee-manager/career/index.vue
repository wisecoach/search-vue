<template>
  <div>

  </div>
</template>

<script>
import {} from '@/api/career'

export default {
  name: "career",
  data(){
    return {
      career: null,
      attendances: [],
      performances: [],
      crimes: [],

    }
  },
  computed: {
    apScore(){
      let attendanceList = []
      let performanceList = []
      let avgAttendance = 0
      let avgPerformance = 0
      this.careers.map((item) => {
        attendanceList.push(item.attendance)
        avgAttendance += item.attendance
        performanceList.push(item.performance)
        avgPerformance += item.performance
      })
      avgAttendance /= this.careers.length * 20
      avgPerformance /= this.careers.length * 20
      return {
        attendances: attendanceList,
        performances: performanceList,
        avgAttendance: avgAttendance,
        avgPerformance: avgPerformance
      }
    }
  },
  methods: {
    init(){

    },

  }
}
</script>

<style scoped>

</style>
