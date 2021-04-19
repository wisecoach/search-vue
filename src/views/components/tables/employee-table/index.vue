<template>
  <el-table
    :data="tableData"
    v-loading="loading"
    border
    style="width: 100%">
    <el-table-column
      label="姓名"
      width="150"
      >
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="部门"
      width="100"
      >
      <template slot-scope="scope">
        {{scope.row.department}}
      </template>
    </el-table-column>
    <el-table-column
      label="性别"
      width="100">
      <template slot-scope="scope">
        {{scope.row.gender === 1 ? '男' : '女'}}
      </template>
    </el-table-column>
    <el-table-column
      label="年龄"
      width="100"
      >
      <template slot-scope="scope">
        {{ formatBirth(scope.row.birth) }}
      </template>
    </el-table-column>
    <el-table-column
      label="工龄"
      width="100"
      >
      <template slot-scope="scope">
        {{scope.row.seniority && scope.row.seniority.toFixed(1) || 0.0}}年
      </template>
    </el-table-column>
    <el-table-column
      label="学历"
      width="150"
      >
      <template slot-scope="scope">
        {{formatDegree(scope.row.degree)}}
      </template>
    </el-table-column>
    <el-table-column
      label="Tel"
      width="150">
      <template slot-scope="scope">
        {{scope.row.tel}}
      </template>
    </el-table-column>
    <el-table-column
      label="Email"
      width="200">
      <template slot-scope="scope">
        {{scope.row.mail}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleRoute('/employee/detail/' + scope.row.id)">查看详细信息</el-button>
        <el-button
          size="mini"
          @click="handleRoute('/employee/evaluate/' + scope.row.id)">评价</el-button>
        <el-button
          size="mini"
          @click="handleRoute('/employee/update/' + scope.row.id)">信息修改</el-button>
        <el-button
          size="mini"
          @click="handleDismiss(scope.row)">辞退</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {getEmployeeList} from '@/api/employee'
import {employerQuit} from '@/api/career'
import {formatBirth, formatDegree} from '@/utils/info-format'

export default {
  name: "employee-table",
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleRoute(path) {
      this.$router.push({path: path})
    },
    handleCommand(val){
      this.$router.push({path: val})
    },
    handleDismiss(val){
      this.$confirm('是否要辞退员工"' + val.name + '" ？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        employerQuit(val.id).then(res => {
          if (res.data.code === 100) {
            this.$message.success(res.data.msg)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    formatBirth,formatDegree
  },
}
</script>

<style scoped>

</style>
