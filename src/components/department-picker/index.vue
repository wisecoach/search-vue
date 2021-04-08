<template>
  <div>
    <el-select v-model="selectedDepartment" placeholder="请选择备选部门" @change="">
      <el-option
        v-for="department in departments"
        :key="department.value"
        :label="department.label"
        :value="department.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import {searchAllDepartment} from '@/api/search'

export default {
  name: "department-picker",
  data(){
    return {
      selectedDepartment: '',
      departments: []
    }
  },
  methods: {
    init(){
      searchAllDepartment().then(res => {
        if (res.data.code === 100) {
          this.departments = res.data.data.map((item) => {
            return {
              value: item.id,
              label: item.name
            }
          })

        }
      })
    },
    handleChange(val){
      this.$emit('select', val)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
