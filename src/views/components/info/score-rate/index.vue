<template>
  <div v-if="score">
    <el-col :span="12">
      <el-card class="attitude-card">
        <div slot="header">
          工作态度
        </div>
        <el-rate v-model="score.attitude"
                 :disabled="disable"
                 :max="5"
                 show-text
                 text-color="#ff9900"
                 :texts="texts_attitude"
        >
        </el-rate>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="ability-card">
        <div slot="header">
          工作能力
        </div>
        <el-rate v-model="score.ability"
                 :disabled="disable"
                 :max="5"
                 show-text
                 text-color="#ff9900"
                 :texts="texts_ability"
        >
        </el-rate>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "score-rate",
  props: {
    score: {
      type: Object
    },
    disable: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      texts_attitude: ['态度差','态度较差','态度一般','态度较好','态度极好',],
      texts_ability: ['能力差','能力较差','能力一般','能力较好','能力极好',]
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.attitude-card,.ability-card{
  margin: 5px 5px 25px;
  height: 180px;
}

::v-deep .el-rate__icon,.el-rate__item{
  font-size: 36px;
}
</style>
