<template>
  <div>
    <amount-line-chart/>
    <out-employee-table/>
  </div>
</template>

<script>
import AmountLineChart from "@/views/components/charts/amount-line-chart";
import OutEmployeeTable from '@/views/components/tables/employee-inner-table';

export default {
  name: "index",
  components: {AmountLineChart, OutEmployeeTable},
  methods: {
    handleSelect(val){
      console.log(val)
    }
  }
}
</script>

<style scoped>

</style>
