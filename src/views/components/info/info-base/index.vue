<template>
  <div v-if="employee">
    <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>员工信息</span>
              </div>
              <div class="name-role">
                <el-col :span="12">
                  <div class="sender">员工姓名：{{employee.name}}</div>
                </el-col>
                <el-col :span="12">
                  <div class="photo">
                    <div>
                      <el-image
                        style="width: 100px;height: 100px;margin-left: 20px;border-radius: 5px"
                        :src="employee.photo">
                      </el-image>
                    </div>
                  </div>
                </el-col>
              </div>
              <el-divider></el-divider>
              <div class="user-base">
                <div><span>在职状态：</span>{{employee.hired?'在职':'未就职'}}<router-link style="float: right" v-if="!employee.hired" :to="'/recruit/hire/' + employee.id">点击进入录用页面</router-link></div>
                <div><span>所属公司：</span>{{employee.enterprise}}</div>
                <div><span>所属部门：</span>{{employee.department}}</div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本资料</span>
            </div>
            <el-form :model="employee" label-width="80px" label-position="left">
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="性别">
                    {{employee.gender==1?'男':'女'}}
                  </el-form-item>
                  <el-form-item label="出生日期">
                    {{formatDate(employee.birth, 'yyyy-MM-dd')}}
                  </el-form-item>
                  <el-form-item label="工龄">
                    {{employee.seniority && employee.seniority.toFixed(1) || 0.0}}年
                  </el-form-item>
                  <el-form-item label="联系电话">
                    {{employee.tel}}
                  </el-form-item>
                  <el-form-item label="电子邮箱">
                    {{employee.mail}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地址">
                    {{employee.address}}
                  </el-form-item>
                  <el-form-item label="主修专业">
                    {{employee.major}}
                  </el-form-item>
                  <el-form-item label="学历层次">
                    {{formatDegree(employee.degree)}}
                  </el-form-item>
                  <el-form-item label="毕业院校">
                    {{employee.school}}
                  </el-form-item>
                  <el-form-item label="简历">
                    <a target="_blank" :href="employee.resume">查看简历</a>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import {formatDate} from "@/utils/date";
import {formatDegree} from '@/utils/info-format'

export default {
  name: "info-base",
  props: {
    employee: Object
  },
  data(){
    return{
      degrees
    }
  },
  methods: {
    formatDate, formatDegree
  }
}
</script>

<style lang="scss" scoped>

* {
  font-size: 16px;
}

.root-card {
  padding-bottom: 30px;
}

.box-card {
  height: 430px;
}

.name-role {
  height:100px;
  font-size: 16px;

  .sender {
    height: 100px;
    line-height: 100px;
  }
}

.user-base {
  div {
    padding: 10px;

    span{
      display: inline-block;
      width: 150px;
    }
  }
}

.info-base {
  div {
    padding: 10px;
    width: 100%;

    span{
      display: inline-block;
      width: 300px;
    }
  }
}

.submit-button {
  padding-top: 40px;
  text-align: center;
}

.relation-item {
  padding: 10px;
}

.photo {
  width: 120px;
  height: 100px;
  float: right;

  div {
    width: 100px;
    height: 100%;
    line-height: 100px;
    display: inline-block;
    vertical-align: text-bottom;
  }
}

</style>
