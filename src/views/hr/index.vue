<template>
  <div>
    <occupation-picker :check-strictly="true" :show-all-levels="false" @select="handleSelect"/>
    <amount-line-chart/>
  </div>
</template>

<script>
import AmountLineChart from "@/views/charts/amount-line-chart";
import OccupationPicker from '@/components/occupation-picker'

export default {
  name: "index",
  components: {AmountLineChart, OccupationPicker},
  methods: {
    handleSelect(val){
      console.log(val)
    }
  }
}
</script>

<style scoped>

</style>
