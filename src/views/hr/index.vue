<template>
  <div>
    <degree-picker />
<!--    <age-picker />-->
<!--    <amount-line-chart/>-->
<!--    <out-employee-table/>-->
  </div>
</template>

<script>
import AmountLineChart from "@/views/components/charts/amount-line-chart";
import OutEmployeeTable from '@/views/components/tables/employee-table';
import AgePicker from "@/views/components/search/employee-search/components/age-picker";
import DegreePicker from "@/views/components/search/employee-search/components/degree-picker";

export default {
  name: "index",
  components: {DegreePicker, AgePicker, AmountLineChart, OutEmployeeTable},
  methods: {
    handleSelect(val){
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
