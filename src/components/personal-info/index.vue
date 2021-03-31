<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "personal-info",
  props: {
    employee: {
      type: Object,
      default: {
        name: 'test-employee',
        gender: 1,
        tel: '13375832226',
        hired: true,
        photo: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";



</style>
