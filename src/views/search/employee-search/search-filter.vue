<template>
  <div class="filter" v-if="type">
    <div v-if="type === filter_options[0].value">
      1
    </div>
    <div v-else-if="type === filter_options[1].value">
      2
    </div>
    <div v-else-if="type === filter_options[2].value">

    </div>
    <div v-else-if="type === filter_options[3].value">

    </div>
    <div v-else-if="type === filter_options[4].value">

    </div>
    <div v-else-if="type === filter_options[5].value">

    </div>
    <div v-else-if="type === filter_options[6].value">

    </div>
    <div v-else-if="type === filter_options[7].value">

    </div>
    <div v-else-if="type === filter_options[8].value">
      <el-button @click="handleClose">{{ filter_options[8].label }} <i class="el-icon-delete"/></el-button>
      <occupation-picker @select="handler($event, filterData.type)">
      </occupation-picker>
    </div>
  </div>
</template>

<script>
import {search_employee_options} from '@/settings-options'
import OccupationPicker from "@/components/occupation-picker";

export default {
  name: "search-filter",
  components: {OccupationPicker},
  props: {
    filterData: {
      type: Object,
      default: {}
    },
  },
  data(){
    return {
      filter_options: search_employee_options.filter_type,
      type: this.filterData.type,
      handler: this.filterData.handler
    }
  },
  methods: {
    handleClose(){
      this.$emit("close", this.filterData.type)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter div {
  display: inline-block;
}

.el-button{

  &:hover,
  &:focus,
  &:active{
    background-color: inherit;
    color: inherit;
    border-color: inherit;
  }
}

</style>
