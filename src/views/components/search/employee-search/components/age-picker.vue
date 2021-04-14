<template>
  <div>
    <div class="input-container">
      <el-input v-model="age[0]" @change="handleChange">
        <template slot="append"><slot/></template>
      </el-input>
    </div>
    <el-divider direction="vertical" />
    <div class="input-container">
      <el-input v-model="age[1]" @change="handleChange">
        <template slot="append"><slot/></template>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "age-picker",
  data(){
    return {
      age: [null, null]
    }
  },
  methods: {
    handleChange() {
      this.$emit('select', this.age)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  width: 150px;
  display: inline-block;
}
</style>
