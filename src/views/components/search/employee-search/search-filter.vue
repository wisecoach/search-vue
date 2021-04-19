<template>
  <div class="filter" v-if="type">
    <!-- 年龄 -->
    <div v-if="type === filter_options[0].value">
      <el-button @click="handleClose">{{ filter_options[0].label }} <i class="el-icon-delete"/></el-button>
      <age-picker @select="handler($event, filterData.type)" >
        <template>岁</template>
      </age-picker>
    </div>
    <!-- 性别 -->
    <div v-else-if="type === filter_options[1].value">
      <el-button @click="handleClose">{{ filter_options[1].label }} <i class="el-icon-delete"/></el-button>
      <el-select v-model="gender" @change="handler($event, filterData.type)">
        <el-option :key="0" label="女" value="0"/>
        <el-option :key="1" label="男" value="1"/>
      </el-select>
    </div>
    <!-- 工龄 -->
    <div v-else-if="type === filter_options[2].value">
      <el-button @click="handleClose">{{ filter_options[2].label }} <i class="el-icon-delete"/></el-button>
      <age-picker @select="handler($event, filterData.type)" >
        <template>年</template>
      </age-picker>
    </div>
    <!-- 学历 -->
    <div v-else-if="type === filter_options[3].value">
      <el-button @click="handleClose">{{ filter_options[3].label }} <i class="el-icon-delete"/></el-button>
      <degree-picker @select="handler($event, filterData.type)"></degree-picker>
    </div>
    <!-- 职业 -->
    <div v-else-if="type === filter_options[4].value">
      <el-button @click="handleClose">{{ filter_options[4].label }} <i class="el-icon-delete"/></el-button>
      <occupation-picker @select="handler($event, filterData.type)">
      </occupation-picker>
    </div>
  </div>
</template>

<script>
import {search_options} from '@/settings-options'
import OccupationPicker from "@/components/occupation-picker";
import AgePicker from "@/views/components/search/components/age-picker";
import DegreePicker from "@/views/components/search/components/degree-picker";

export default {
  name: "search-filter",
  components: {DegreePicker, AgePicker, OccupationPicker},
  props: {
    filterData: {
      type: Object,
      default: {}
    },
  },
  data(){
    return {
      filter_options: search_options.search_employee_options.filter_type,
      type: this.filterData.type,
      handler: this.filterData.handler,
      gender: null
    }
  },
  methods: {
    handleClose(){
      this.$emit("close-filter", this.filterData.type)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter div {
  display: inline-block;
  margin-bottom: 5px;
}

.el-button{
  margin-right: 10px;

  &:hover,
  &:focus,
  &:active{
    background-color: inherit;
    color: inherit;
    border-color: inherit;
  }
}

</style>
