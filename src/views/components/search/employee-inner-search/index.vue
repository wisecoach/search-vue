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
        v-for="(filter, key) in filter_map"
        :key="key"
        @close="handleRemoveFilter"
        :filter-data="filter[1]"/>
      <el-select v-if="selecting" v-model="new_filter_index" @change="handleNewFilterSelect" placeholder="过滤器类型">
        <el-option
          v-for="(option, index) in options.filter_type"
          :label="option.label"
          :value="index"
          :disabled="filters.get(option.value)!=null"/>
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
import {search_employee_options} from '@/settings-options'
import SearchFilter from "./search-filter";

export default {
  name: "employee-inner-search",
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
      filters: new Map(),
      filter_tracker: 0,
      options: search_employee_options,
    }
  },
  computed: {
    collapseTitle(){
      return this.use_filter ? "关闭删选" : "筛选条件"
    },
    handlerList(){
      const list = []
      list.push(this.handleOccupation)
      list.push(this.handleOccupation)
      list.push(this.handleOccupation)
      list.push(this.handleOccupation)
      list.push(this.handleOccupation)
      list.push(this.handleOccupation)
      list.push(this.handleOccupation)
      list.push(this.handleOccupation)
      list.push(this.handleOccupation)
      return list
    },
    filter_map(){
      let x = this.filter_tracker
      return this.filters
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
    handleNewFilterClick(){
      this.new_filter_index = null
      this.selecting = true
    },
    handleRemoveFilter(type){
      this.filters.delete(type)
      this.filter_tracker += 1
    },
    handleClearFilter(){
      this.filters = new Map()
      this.filter_tracker += 1
    },
    handleNewFilterSelect(val){
      this.selecting = false
      const type = search_employee_options.filter_type[val].value
      const filter = {
        type,
        handler: this.handlerList[val]
      }
      this.filters.set(type, filter)
      this.filter_tracker += 1
    },
    handleCollapse(){
      this.use_filter = !this.use_filter
    },
    handleSearch(){
      this.$emit('search', this.search_params)
    },
    handleOccupation(val, type){
      this.filters.get(type).value = val
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
