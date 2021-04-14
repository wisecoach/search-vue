<template>
  <div class="index-page">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="user-info">
          <template slot="header">用户信息</template>
          <div class="user-avatar">
            <el-avatar :src="user.photo" :size="80"></el-avatar>
            <div class="user-name">{{user.name}}</div>
          </div>
          <el-divider/>
          <div class="user-base">
            <div><span>在职公司：</span>{{user.enterprise}}</div>
            <div><span>职业：</span>HR</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <amount-line-chart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AmountLineChart from '@/views/components/charts/amount-line-chart'
import {hrInfo} from "@/api/info";
import 'vuex'
import {mapState} from "vuex";

export default {
  name: "index",
  components: {AmountLineChart},
  data() {
    return {
    }
  },
  methods: {
    init() {
      hrInfo().then(res => {
        if (res.data.code === 100) {
          this.hr = res.data
        }
      })
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.index-page {
}

.user-info {
  .user-avatar {
    text-align: center;

    .user-name {
      font-weight: bold;
      padding-top: 20px;
    }
  }

  .user-base {
    div {
      padding: 10px;

      span {
        display: inline-block;
        width: 150px;
      }
    }
  }

}
</style>
