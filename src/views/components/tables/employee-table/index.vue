<template>
  <el-table
    :data="tableData"
    v-loading="loading"
    border
    height="780px"
    style="width: 100%">
    <el-scrollbar style="height: 100%">
    <el-table-column
      label="姓名"
      width="150">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="bottom">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            {{ scope.row.name }}
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="部门"
      width="150">
      <template slot-scope="scope">
        {{scope.row.department}}
      </template>
    </el-table-column>
    <el-table-column
      label="性别"
      width="150">
      <template slot-scope="scope">
        {{scope.row.gender === 1 ? '男' : '女'}}
      </template>
    </el-table-column>
    <el-table-column
      label="年龄"
      width="150">
      <template slot-scope="scope">
        {{ formatBirth(scope.row.birth) }}
      </template>
    </el-table-column>
    <el-table-column
      label="工龄"
      width="150">
      <template slot-scope="scope">
        {{scope.row.seniority}}年
      </template>
    </el-table-column>
    <el-table-column
      label="学历"
      width="150">
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
      width="150">
      <template slot-scope="scope">
        {{scope.row.mail}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="300"
      fixed="right"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleRoute('/employee/detail/' + scope.row.id)">查看详细信息</el-button>
        <el-button
          size="mini"
          @click="handleRoute('/employee/evaluate/' + scope.row.id)">评价</el-button>
        <el-dropdown  style="float: right" @command="handleCommand">
          <el-button
            size="mini"
            icon="el-icon-more"
            circle
            ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'/employee/info-update/'+scope.row.id">信息修改</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
    </el-scrollbar>
  </el-table>
</template>
<script>
import {getEmployeeList} from '@/api/employee'
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
    formatBirth,formatDegree
  },
}
</script>

<style scoped>

</style>
