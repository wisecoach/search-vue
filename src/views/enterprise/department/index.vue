<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="department-table">
          <el-card>
            <el-table
              ref="table"
              :data="departmentTableData"
              v-loading="loading"
              border
              highlight-current-row
              @current-change="handleChange"
            >
              <el-table-column
                width="50"
                label="编号"
                type="index">

              </el-table-column>
              <el-table-column
                label="部门名"
                width="150"
              >
                <template slot-scope="scope">
                  {{scope.row.name}}
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
              >
                <template slot-scope="scope">
                  {{formatDate(scope.row.ctime)}}
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="openUpdateDepartment(scope.row)" size="mini" type="danger" plain icon="el-icon-password">修改名称</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="operation">
          <el-card header="过滤器">
            <el-input v-model="deptFilter" @change="filterToTable">
              <template slot="prepend">部门：</template>
            </el-input>
          </el-card>
          <el-card header="操作">
            <el-button @click="openNewDepartment" type="primary" plain icon="el-icon-add">新增</el-button>
            <el-button @click="openUpdateDepartment(selectRow)" :disabled="selectRow==null" type="danger" plain icon="el-icon-password">修改名称</el-button>
          </el-card>
          <el-card header="温馨提示">
            <ol class="tip">
              <li>
                账号创建后不可注销，请谨慎操作。
              </li>
              <li>
                用户名建议仅包含字母、数字。
              </li>
              <li>
                用户名、昵称创建后不可修改，密码可修改。
              </li>
            </ol>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {searchAllDepartment} from '@/api/search'
import {createDepartment, changeDepartment} from '@/api/department'
import {formatDate} from "@/utils/date";

export default {
  name: "department",
  data(){
    return {
      departmentTableData: [],
      departments: [],
      selectRow: null,
      loading: false,
      deptFilter: '',
    }
  },
  methods: {
    init(){
      this.getDepartments()
    },
    getDepartments(){
      this.loading = true
      searchAllDepartment().then(res=>{
        this.loading = false
        if (res.data.code === 100) {
          this.departments = res.data.data
          this.filterToTable()
        }
      })
    },
    filterToTable(){
      this.loading = true
      this.departmentTableData = []
      this.departments.map((item => {
        let matchDept = this.deptFilter === '' ? true : item.name.startsWith(this.deptFilter)
        if (matchDept){
          this.departmentTableData.push(item)
        }
      }))
      this.loading = false
    },
    handleChange(val){
      this.selectRow = val
    },
    openNewDepartment(row){
      this.$prompt('请输入的新部门的名称', "新建部门", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        createDepartment({name: value}).then(res => {
          this.msgSuccess("修改成功，新部门是：" + value);
          this.getDepartments()
        });
      }).catch(() => {});
    },
    openUpdateDepartment(row){
      this.$prompt('请输入部门的新名称', "修改部门名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        changeDepartment({id: row.id, name: value}).then(res => {
          if (res.data.code === 100){
            this.$message.success(res.data.msg);
            this.getDepartments()
          }else {
            this.$message.error(res.data.msg)
          }
        });
      }).catch(() => {});
    },
    formatDate
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>

.operation {
  .el-card {
    margin-bottom: 20px;

    .el-input {
      margin: 5px 0;
    }
  }
}

.user-dialog {
  margin: auto;
  text-align: center;
  width: 900px;
}

.tip {
  padding-left: 20px;
}

</style>
