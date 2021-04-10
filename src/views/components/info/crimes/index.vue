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
              <span>等级：{{crimeRankInfo(crime.rank)}}</span>
              <span>违规时间：{{formatDate(crime.critime, "yyyy-MM-dd")}}</span>
              <div>概要内容：{{crime.detail}}</div>
            </div>
          </template>
          <div>详细内容：{{crime.detail}}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-else style="text-align: center">
      好诶，没有违例记录
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/utils/date'
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
  },
  methods: {
    crimeWarningColor(rank){
      let color = ['#E6A23C', '#EA944C', '#EE8651', '#F1785C', '#F56C6C']
      return color[rank]
    },
    crimeRankInfo(rank){
      let info = ["警告", "记过", "大过", "留用察看", "解除劳动合同"]
      return info[rank]
    },
    formatDate
  }
}
</script>

<style lang="scss" scoped>
.crime-title {
  span {
    display: inline-block;
    margin-left: 10px;
    width: 200px;
    margin-right: 20px;
  }

  div {
    white-space:nowrap;
    display: inline-block;
    overflow:hidden;
    text-overflow:ellipsis;
    width: 500px;
    float: right;
  }
}
</style>
