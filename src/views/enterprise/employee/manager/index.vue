<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="manager-table">
          <el-card>
            <el-table
              ref="table"
              :data="managerTableData"
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
                label="用户名"
                width="150"
              >
                <template slot-scope="scope">
                  {{scope.row.username}}
                </template>
              </el-table-column>
              <el-table-column
                label="姓名"
                width="150"
              >
                <template slot-scope="scope">
                  {{scope.row.name}}
                </template>
              </el-table-column>
              <el-table-column
                label="部门"
                width="150"
              >
                <template slot-scope="scope">
                  {{scope.row.department}}
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
                  <el-button @click="openUpdatePassword(scope.row)" size="mini" type="danger" plain icon="el-icon-password">修改密码</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="operation">
          <el-card header="过滤器">
            <el-input v-model="usernameFilter" @change="filterToTable">
              <template slot="prepend">用户名：{{user_prefix}}</template>
            </el-input>
            <el-input v-model="nameFilter" @change="filterToTable">
              <template slot="prepend">姓名：</template>
            </el-input>
            <el-input v-model="deptFilter" @change="filterToTable">
              <template slot="prepend">部门：</template>
            </el-input>
          </el-card>
          <el-card header="操作">
            <el-button @click="openNewUserDialog" type="primary" plain icon="el-icon-add">新增</el-button>
            <el-button @click="openUpdatePassword(selectRow)" :disabled="selectRow==null" type="danger" plain icon="el-icon-password">修改密码</el-button>
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
    <el-dialog class="user-dialog" title="新建MANAGER账号" :visible.sync="visibleNewUserDialog">
      <el-form ref="newUserForm" status-icon :model="newUserData" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="newUserData.username" type="text" auto-complete="off" placeholder="账号">
            <template slot="prepend">{{user_prefix}}</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="newUserData.name" type="text" auto-complete="off" placeholder="昵称">
            <svg-icon slot="prepend" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="depid">
          <el-select
            style="width: 100%"
            v-model="newUserData.depid"
            :loading="loading"
            placeholder="请选择所属部门">
            <el-option
              v-for="dept in departments"
              :label="dept.name"
              :value="dept.id"
              :key="dept.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="newUserData.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
          >
            <svg-icon slot="prepend" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input
            v-model="newUserData.checkPassword"
            type="password"
            auto-complete="off"
            placeholder="确认密码"
          >
            <svg-icon slot="prepend" icon-class="check" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleNewUser"
          >
            <span v-if="!loading">新 建</span>
            <span v-else>新 建 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {searchManager, searchAllDepartment} from '@/api/search'
import {
  createManagerAccount,
  checkDuplicatedName,
  changeManagerAccount,
} from '@/api/user'
import {formatDate} from "@/utils/date";

export default {
  name: "manager",
  data(){
    let validateDuplicated = (rule, value, callback) => {
      checkDuplicatedName(this.newUserData.username).then(res=>{
        if (res.data.code === 100){
          callback();
        }else if(res.data.code === 207) {
          callback(new Error('该用户名已经被占用！！！'))
        }
      })
    }
    let validateCheckPassword = (rule, value, callback) => {
      if (this.newUserData.password === value){
        callback()
      }else {
        callback(new Error('两次密码不相同！'))
      }
    }
    return {
      managerTableData: [],
      managers: [],
      departments: [],
      selectRow: null,
      visibleNewUserDialog: false,
      newUserData: {
        name: '',
        username: '',
        password: '',
        depid: null,
        checkPassword: ''
      },
      loading: false,
      rules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入用户名'},
          {validator: validateDuplicated, trigger: 'blur'}
        ],
        depid: [{required: true, trigger: 'blur', message: '请选择所属部门'}],
        name: [{required: true, trigger: 'blur', message: '请输入姓名'}],
        password: [{required: true, trigger: 'blur', message: '请输入密码'}],
        checkPassword: [{validator: validateCheckPassword, trigger: 'blur'}]
      },
      usernameFilter: '',
      nameFilter: '',
      deptFilter: '',
    }
  },
  computed: {
    user_prefix(){
      return this.$store.state.user.user.username + '_'
    }
  },
  methods: {
    init(){
      this.getManagers()
      this.getDepartments()
    },
    getManagers(){
      this.loading = true
      searchManager().then(res=>{
        if (res.data.code === 100) {
          this.managers = res.data.data
          this.filterToTable()
        }
        this.loading = false
      })
    },
    filterToTable(){
      this.loading = true
      this.managerTableData = []
      this.managers.map((item => {
        let matchUserName = this.usernameFilter === '' ? true : item.username.startsWith(this.user_prefix + this.usernameFilter)
        let matchName = this.nameFilter === '' ? true : item.name.startsWith(this.nameFilter)
        let matchDept = this.deptFilter === '' ? true : item.department.startsWith(this.deptFilter)
        if (matchName && matchUserName && matchDept){
          this.managerTableData.push(item)
        }
      }))
      this.loading = false
    },
    getDepartments(){
      this.loading = true
      searchAllDepartment().then(res=>{
        this.loading = false
        if (res.data.code === 100) {
          this.departments = res.data.data
        }
      })
    },
    handleChange(val){
      this.selectRow = val
    },
    openNewUserDialog(){
      this.clearNewUserData()
      this.visibleNewUserDialog = true
    },
    handleNewUser(){
      this.loading = true
      createManagerAccount(this.newUserData).then(res=>{
        this.loading = false
        if (res.data.code === 100) {
          this.getManagers()
          this.visibleNewUserDialog = false
          this.$message.success(res.data.msg)
        }else {
          this.$message.error(res.data.msg)
        }
      })
    },
    openUpdatePassword(row){
      this.$prompt('请输入"' + row.name + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        changeManagerAccount(row.id, value).then(res => {
          this.msgSuccess("修改成功，新密码是：" + value);
        });
      }).catch(() => {});
    },
    clearNewUserData(){
      this.newUserData = {
        name: '',
        username: '',
        password: ''
      }
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
