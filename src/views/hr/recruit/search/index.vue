<template>
  <div>
    <el-card>
      <recruit-search @search="handleSearch"/>
    </el-card>
    <el-card class="container">
      <recruit-table :table-data="tableData" :loading="loading"></recruit-table>
      <div class="pager">
        <el-pagination
          @current-change="handlePageChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {searchDropEmployee} from "@/api/search";
import {formatBirth, formatDegree} from '@/utils/info-format'
import DepartmentPicker from "@/components/department-picker";
import RecruitSearch from "@/views/components/search/recruit-search";
import RecruitTable from "@/views/components/tables/recruit-table";

export default {
  name: "search",
  components: {RecruitTable, RecruitSearch, DepartmentPicker},
  data() {
    return {
      tableData: [],
      pageSize: 10,
      page: 0,
      total: 0,
      loading: true,
      key: {
        type: 'NAME',
        value: ''
      },
      filters: [],
    }
  },
  computed: {
    searchInfo() {
      return {
        key: this.key,
        filters: this.filters,
        page: this.page,
        pageSize: this.pageSize
      }
    }
  },
  methods: {
    search(){
      if (!this.validateSearchInfo()) {
        return
      }
      this.loading = true
      searchDropEmployee(this.searchInfo).then(res=>{
        if (res.data.code === 100){
          let data = res.data.data
          this.total = data.total
          let listdata = data.list
          this.tableData = []
          for (let item of listdata){
            this.tableData.push(item)
          }
        }
        this.loading = false
      })
    },
    validateSearchInfo(){
      let key = this.searchInfo.key;
      if (key.type == null || key.type === ""){
        this.$message.error("请选择搜索关键词的类型")
        return false
      }
      return true
    },
    handlePageChange(val){
      this.page = val
      this.search()
    },
    handleSearch(val){
      this.tableData = []
      this.page = 0
      this.key = val.key
      this.filters = val.filters
      this.search()
    },
    formatBirth,formatDegree
  },
  mounted() {
    this.search()
  }
}
</script>

<style lang="scss" scoped>
.pager {
  padding: 30px 20px;
  text-align: right;
}

.el-card {
  margin-bottom: 20px;
}

</style>
