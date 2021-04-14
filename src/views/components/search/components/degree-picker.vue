<template>
  <div>
    <el-select v-model="degree[0]" @change="handleChange">
      <el-option v-for="(value, key) in degrees" :value="key" :label="value" :disabled="key>(degree[1]||8)"/>
    </el-select>
    <el-divider direction="vertical" />
    <el-select v-model="degree[1]" @change="handleChange">
      <el-option v-for="(value, key) in degrees" :value="key" :label="value" :disabled="key<(degree[0]||0)"/>
    </el-select>
  </div>
</template>

<script>
import {degrees} from "@/utils/info-format";

export default {
  name: "degree-picker",
  data(){
    return {
      degree: [null, null],
      degrees
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('select', this.degree)
    }
  }
}
</script>

<style scoped>

</style>
