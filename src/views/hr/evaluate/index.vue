<template>
<div>
  <info-base :employee="employee" />
  <el-card  class="card">
    <template slot="header">
      总体评分
    </template>
    <score-rate :score="avgScore" />
  </el-card>
  <el-card class="card">
    <template slot="header">
      主观评价
    </template>
    <el-form>
    <el-form-item label="评价内容">
      <el-input type="textarea" v-model="formMess.desc" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import {searchAllCareerbyEmpid, searchAllAvgbyEmpid} from '@/api/career'
import InfoBase from "@/views/components/info/info-base";
import CareerBase from "@/views/components/info/career-base";
import ScoreRate from "@/views/components/info/score-rate";
import axios from 'axios';

export default {
  name: "evaluate",
  components: {ScoreRate, CareerBase, InfoBase},
  data(){
    return{
      formMess: {
        "desc": ""
      },
      avgScore: null,
    }
  },
  methods: {
    init(){
      this.id = this.$route.params.id
      this.getEmployee()
      this.getCareers()
      this.getAvgScore()
    },
    getEmployee(){

    },
    onSubmit() {
      console.log('submit!');
      let formData = new FormData();
      for(var key in this.formMess){
        formData.append(key,this.formMess[key]);
      }

      axios({
        method:"post",
        url:"",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true,
        data:formData
      }).then((res)=>{
        console.log(res);
      });

    },
    getAvgScore(){
      searchAllAvgbyEmpid(this.id).then(res => {
        if (res.data.code === 100) {
          this.avgScore = res.data.data
          this.avgScore.attitude /= 20
          this.avgScore.ability /= 20
        }
      })
    },
    getCareers(){
      searchAllCareerbyEmpid(this.id).then(res => {
        if (res.data.code === 100) {
          this.careers = res.data.data
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

.card{
  margin-block: 20px;
}

.el-form-item{
  text-align: center;
}
</style>
