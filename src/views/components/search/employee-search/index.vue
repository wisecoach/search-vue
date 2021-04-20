<template>
  <div>
    <el-input v-model="key.value" placeholder="请输入搜索关键词">
      <el-select v-model="key.type" slot="prepend" placeholder="关键词类型">
        <el-option v-for="option in options.key_type" :label="option.label" :value="option.value">
        </el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
    </el-input>
    <el-collapse @change="handleCollapse">
      <el-collapse-item>
        <template slot="title">{{collapseTitle}}</template>
        <search-filter
          v-for="(filter, index) in filters"
          :key="filter.type"
          @close-filter="handleRemoveFilter"
          :filter-data="filter"/>
      <el-select v-if="selecting" v-model="new_filter_index" @change="handleNewFilterSelect" placeholder="过滤器类型">
        <el-option
          v-for="(option, index) in options.filter_type"
          :label="option.label"
          :value="index"
          :disabled="selected_filters.indexOf(option.value)!==-1"/>
      </el-select>
      <div v-else style="padding-top: 20px">
        <el-button @click="handleNewFilterClick">新增过滤器</el-button>
        <el-button @click="handleClearFilter">清空过滤器</el-button>
      </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {search_options} from '@/settings-options'
import SearchFilter from "./search-filter";

export default {
  name: "employee-search",
  components: {SearchFilter},
  data() {
    return {
      use_filter: false,
      key: {
        value: '',
        type: 'NAME',
      },
      selecting: false,
      new_filter_index: null,
      filters: [],
      selected_filters: [],
      options: search_options.search_employee_options,
    }
  },
  computed: {
    collapseTitle(){
      return this.use_filter ? "关闭删选" : "筛选条件"
    },
    handlerList(){
      const list = []
      list.push(this.handleDoubleVal)
      list.push(this.handleSingleVal)
      list.push(this.handleDoubleVal)
      list.push(this.handleDoubleVal)
      list.push(this.handleSingleVal)
      return list
    },
    search_params(){
      const params = {
        filters: Array.from(this.filters.values()).map(item => {
          return {
            type: item.type,
            value: item.value
          }
        }),
        key: this.key
      }
      return params
    }
  },
  methods: {
    getIndex(type){
      return this.selected_filters.indexOf(type)
    },
    handleNewFilterClick(){
      this.new_filter_index = null
      this.selecting = true
    },
    handleRemoveFilter(type){
      const index = this.getIndex(type)
      this.filters.splice(index, 1)
      this.selected_filters.splice(index, 1)
    },
    handleClearFilter(){
      this.filters = []
      this.selected_filters = []
    },
    handleNewFilterSelect(val){
      this.selecting = false
      const type = this.options.filter_type[val].value
      const filter = {
        type,
        handler: this.handlerList[val]
      }
      this.filters.push(filter)
      this.selected_filters.push(type)
    },
    handleCollapse(){
      this.use_filter = !this.use_filter
    },
    handleSearch(){
      this.$emit('search', this.search_params)
    },
    handleSingleVal(val, type){
      this.filters[this.getIndex(type)].value = val + '-' + val
    },
    handleDoubleVal(val, type){
      let data = val[0] + '-' + val[1]
      this.filters[this.getIndex(type)].value = data
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input{
  .el-select {
    width: 120px;
  }
}

</style>
