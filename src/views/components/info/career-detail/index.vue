<template>
  <div v-if="career">
    <el-col :span="12">
      <div class="career-wrapper">
        <div>员工名称：{{career.employee.name}}</div>
        <div>在职公司：{{career.enterprise}}</div>
        <div>在职部门：{{career.department}}</div>
        <div>就职职位：{{career.occupation}}</div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="career-wrapper">
        <div>工作经验：{{career.employee.seniority && career.employee.seniority.toFixed(1) || 0.0}}年</div>
        <div>就职时间：{{formatDate(career.stime, "yyyy年MM月dd日")}}</div>
        <div>离职时间：{{formatDate(career.etime, "yyyy年MM月dd日")}}</div>
        <div>工作时长：{{formatDistance(career.stime, career.etime)}}</div>
      </div>
    </el-col>
  </div>
</template>

<script>
import {formatDate,formatDistance} from "@/utils/date";

export default {
  name: "career-detail",
  props: {
    career: {
      type: Object,
    }
  },
  methods: {
    formatDate,formatDistance
  }
}
</script>

<style lang="scss" scoped>
.career-wrapper {
  padding: 10px 30px 30px 30px;

  div {
    padding: 5px 0px;
  }
}
</style>
