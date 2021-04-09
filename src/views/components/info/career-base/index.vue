<template>
  <div>
    <el-collapse accordion v-model="activeName">
      <el-collapse-item
        v-for="career in careers"
        :name="career.id"
        :key="career.id">
        <template slot="title">
          <div class="career-title">
            <span>职位：{{career.occupation}}</span>
            <span>在职企业：{{career.enterprise}}</span>
            <span>在职部门：{{career.department}}</span>
            <span>履历时长：{{formatDistance(career.stime)}}</span>
          </div>
        </template>
        <div class="career-body">
          <span>工作开始时间：{{formatDate(career.stime, "yyyy年MM月dd日")}}</span>
          <span>工作结束时间：{{formatDate(career.etime, "yyyy年MM月dd日")}}</span>
          <span>考勤：{{career.attendance.toFixed(2)}}%</span>
          <span>业绩：{{career.performance.toFixed(2)}}%</span>
          <a :href="'/employee/detail/career/'+career.id">查看详情 <i class="el-icon-arrow-right"/> </a>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {formatDistance, formatDate} from '@/utils/date'
export default {
  name: "career-base",
  props: {
    careers: {
      type: Array,
    }
  },
  data(){
    return {
      activeName: null
    }
  },
  methods: {
    formatDistance,formatDate
  }
}
</script>

<style lang="scss" scoped>
.career-title, .career-body {
  span {
    display: inline-block;
    margin-right: 20px;
    width: 200px;
  }

  a {
    float: right;
    margin-right: 10px;
  }
}
</style>
