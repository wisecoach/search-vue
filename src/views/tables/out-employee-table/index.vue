<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="姓名"
      width="150">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="bottom">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
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
      label="操作"
      width="300"
      fixed="right"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleRoute('/detail/' + scope.row.id)">查看详细信息</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-dropdown  style="float: right" @command="handleCommand">
          <el-button
            size="mini"
            icon="el-icon-more"
            circle
            ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'/info-update/'+scope.row.id">信息修改</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getEmployeeList} from '@/api/employee'
import {formatBirth, formatDegree} from '@/utils/info-format'

export default {
  name: "out-employee-table",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getData(){
      getEmployeeList().then(res=>{
        if (res.data.code === 100){
          let data = res.data.data
          for (let item of data){
            this.tableData.push(item)
          }
        }
      })
    },
    handleRoute(path) {
      console.log(path)
      // this.$router.push({path: path})
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCommand(val){
      console.log(val)
      this.$router.push({path: val})
    },
    formatBirth,formatDegree
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>

</style>
