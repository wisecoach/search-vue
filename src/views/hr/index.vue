<template>
  <div>
    <amount-line-chart/>
  </div>
</template>

<script>
import AmountLineChart from "@/views/charts/amount-line-chart";

export default {
  name: "index",
  components: {AmountLineChart},
  methods: {
    handleSelect(val){
      console.log(val)
    }
  }
}
</script>

<style scoped>

</style>
