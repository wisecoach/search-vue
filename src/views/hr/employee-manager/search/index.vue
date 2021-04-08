<template>
  <div>
    <employee-search @search="handleSearch"/>
    <el-card class="container">
      <out-employee-table :table-data="tableData" :loading="loading"></out-employee-table>
      <el-pagination
        @current-change="handlePageChange"
        :current-page.sync="page"
        :page-size="20"
        layout="total, prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {getEmployeeList} from '@/api/employee'
import {formatBirth, formatDegree} from '@/utils/info-format'
import DepartmentPicker from "@/components/department-picker";
import OutEmployeeTable from "@/views/tables/out-employee-table";
import EmployeeSearch from "@/views/search/employee-search";

export default {
  name: "search",
  components: {EmployeeSearch, OutEmployeeTable, DepartmentPicker},
  data() {
    return {
      tableData: [],
      size: 5,
      page: 0,
      loading: true,
    }
  },
  methods: {
    getDataPage(page){
      this.loading = true
      getEmployeeList().then(res=>{
        if (res.data.code === 100){
          let data = res.data.data
          this.tableData = []
          for (let item of data){
            this.tableData.push(item)
          }
          this.loading = false
        }
      })
    },
    handlePageChange(val){
      this.getDataPage(val)
    },
    handleSearch(){
      this.tableData = []
      this.page = 0
      this.getDataPage(0)
    },
    handleRoute(path) {
      console.log(path)
      // this.$router.push({path: path})
    },
    handleCommand(val){
      this.$router.push({path: val})
    },
    formatBirth,formatDegree
  },
  mounted() {
    this.getDataPage(0)
  }
}
</script>

<style scoped>
.el-pagination{
  position: relative;
  right: 0;
}
</style>
