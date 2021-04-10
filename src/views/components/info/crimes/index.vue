<template>
  <div>
    <div v-if="hasCrimes">
      <el-collapse accordion v-model="activeName">
        <el-collapse-item
          v-for="crime in crimes"
          :key="crime.id"
          :name="crime.id">
          <template slot="title">
            <div class="crime-title">
              <i :style="{color: crimeWarningColor(crime.rank)}" class="el-icon-warning" />
            </div>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-else style="text-align: center">
      好诶，没有违例记录
    </div>
  </div>
</template>

<script>
export default {
  name: "crimes",
  props: {
    crimes: {
      type: Array
    }
  },
  data(){
    return {
      activeName: null
    }
  },
  computed: {
    hasCrimes(){
      return this.crimes.length > 0
    },
    crimeWarningColor(rank){
      let color = ['#E6A23C', '', '', '', '', '#F56C6C']
    },
    crimeRankInfo(rank){
      let info = ["警告", "记过", "大过", "留用察看", "解除劳动合同"]
      return info[rank]
    }
  }
}
</script>

<style scoped>

</style>
