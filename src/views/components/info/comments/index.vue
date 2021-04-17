<template>
  <div v-if="total > 0">
    <el-collapse accordion v-model="activeName">
      <el-collapse-item v-for="comment in comments">
        <template slot="title">
          <div class="comment-title">
            <span>工作态度：{{comment.attitude && comment.attitude.toFixed(0) || 0}}</span>
            <span>工作能力：{{comment.ability && comment.ability.toFixed(0) || 0}}</span>
            <span>评价者：{{comment.isHr?'HR': '部门主管'}}</span>
            <span>评价时间：{{formatDate(comment.ctime, 'yyyy年MM月dd日')}}</span>
          </div>
        </template>
        <div class="comment-body">
          评价内容：{{comment.detail}}
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-pagination
      @current-change="handlePageChange"
      :current-page.sync="page"
      :page-size="pageSize"
      :total="total"
      layout="prev,pager,next,jumper"
    >
    </el-pagination>
  </div>
  <div style="text-align: center" v-else>
    暂时还没有记录哦~
  </div>
</template>

<script>
import {searchCommentbyCaridPageSize} from "@/api/career";
import {formatDate} from "@/utils/date";

export default {
  name: "index",
  props: {
    id: {
      type: Number
    }
  },
  data(){
    return{
      comments: [],
      page: 0,
      pageSize: 5,
      total: 0,
      activeName: null
    }
  },
  methods: {
    init(){
      setTimeout(()=>{
        this.search()
      }, 50)
    },
    search(){
      searchCommentbyCaridPageSize(this.id, this.page, this.pageSize).then(res => {
        if (res.data.code === 100) {
          let data = res.data.data
          this.total = data.total
          this.comments = data.list
        }
      })
    },
    handlePageChange(val) {
      this.page = val
      this.search()
    },
    formatDate
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.comment-title{
  span{
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    width: 200px;
  }
}

.comment-body {
  margin-left: 10px;
}

</style>
