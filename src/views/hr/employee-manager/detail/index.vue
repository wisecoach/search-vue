<template>
  <div>
    <el-card>
      <info-base :employee="employee" />
    </el-card>
    <el-card>
      <template slot="header">
        员工履历
      </template>
      <career-base :careers="careers" />
    </el-card>
    <el-card>
      <template slot="header">
        总体评分
      </template>

    </el-card>
  </div>
</template>

<script>
import {searchAllCareerbyEmpid} from '@/api/career'
import InfoBase from "@/views/components/info/info-base";
import CareerBase from "@/views/components/info/career-base";
export default {
  name: "detail",
  components: {CareerBase, InfoBase},
  data(){
    return {
      id: null,
      employee: {},
      careers: []
    }
  },
  methods: {
    init(){
      this.id = this.$route.params.id
      console.log(this.id)
      this.getEmployee()
      this.getCareers()
    },
    getEmployee(){

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

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}

</style>
