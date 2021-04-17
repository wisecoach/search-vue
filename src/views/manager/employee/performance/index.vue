<template>
  <div>
    <info-base :employee="employee"/>
    <el-row :gutter="20">
      <el-form v-model="performance" label-position="left" label-width="80px">
        <el-col :span="16">
          <el-card header="考勤信息">
            <el-col :span="12">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="performance.stime"
                  type="date"
                  placeholder="选择开始时间"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="performance.etime"
                  type="date"
                  placeholder="选择结束时间"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业绩">
                <el-input v-model="performance.performance">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
              <el-form-item label="提交">
                <el-button @click="handleSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card header="温馨提示">
            由于不同企业的计算业绩方式不同，业绩请设置为0-100之间的值
          </el-card>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import {searchInfobyId} from "@/api/info";
import {inputPerformance} from '@/api/career'
import InfoBase from "@/views/components/info/info-base";

export default {
  name: "performance",
  components: {InfoBase},
  data(){
    return {
      employee: {},
      performance: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    }
  },
  methods: {
    init() {
      this.performance.empid = this.$route.params.id
      this.getEmployee()
    },
    getEmployee(){
      searchInfobyId(this.$route.params.id).then(res=>{
        if (res.data.code === 100) {
          this.employee = res.data.data
        }
      })
    },
    handleSubmit(){
      inputPerformance(this.performance).then(res => {
        if (res.data.code === 100) {
          this.$message.success(res.data.msg)
          this.$router.push('/employee/performance')
        }else {
          this.$message.error(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
