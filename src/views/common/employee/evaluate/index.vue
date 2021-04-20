<template>
<div>
  <info-base :employee="employee" />
  <el-card  class="card">
    <template slot="header">
      总体评分
    </template>
    <score-rate :score="score" :disable="false" />
  </el-card>
  <el-card class="card">
    <template slot="header">
      主观评价
    </template>
    <el-form>
    <el-form-item label="评价内容">
      <el-input
        type="textarea"
        :rows="5"
        v-model="score.detail" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import {searchAllCareerbyEmpid, searchAllAvgbyEmpid, detailedComment} from '@/api/career'
import InfoBase from "@/views/components/info/info-base";
import CareerBase from "@/views/components/info/career-base";
import ScoreRate from "@/views/components/info/score-rate";
import axios from 'axios';
import {searchInfobyId} from "@/api/info";

export default {
  name: "evaluate",
  components: {ScoreRate, CareerBase, InfoBase},
  data(){
    return{
      employee: null,
      formMess: {
        "desc": ""
      },
      score: {
        ability: 5,
        attitude: 5
      }
    }
  },
  methods: {
    init(){
      this.id = this.$route.params.id
      this.score.empid = this.id
      this.getEmployee()
    },
    getEmployee(){
      searchInfobyId(this.$route.params.id).then(res=>{
        if (res.data.code === 100) {
          this.employee = res.data.data
        }
      })
    },
    onSubmit() {
      let score = {
        ability: this.score.ability,
        attitude: this.score.attitude
      }
      detailedComment(this.score).then(res=>{
        if(res.data.code === 100){
          this.$message.success(res.data.msg)
          this.$router.push("/employee/evaluate")
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

.card{
  margin-block: 20px;
}

.el-form-item{
  text-align: center;
}
</style>
