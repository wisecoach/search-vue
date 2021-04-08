<template>
  <div>
    <el-card>
      <info-base />
    </el-card>
  </div>
</template>

<script>
import InfoBase from "@/views/components/info/info-base";
export default {
  name: "detail",
  components: {InfoBase},
  data(){
    return {
      id: this.$route.params.id,
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
