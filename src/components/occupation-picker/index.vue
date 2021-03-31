<template>
  <div>
    <el-cascader :props="props" :show-all-levels="showAllLevels" @change="handleSelect" />
  </div>
</template>

<script>
import {getOccupationChildren} from "@/api/occupation";

let id = 0
export default {
  name: "index",
  props: {
    showAllLevels: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      props: {
        lazy: true,
        lazyLoad: this.getChildrenNodes,
        checkStrictly: this.checkStrictly,
        expandTrigger: 'hover'
      }
    };
  },
  methods: {
    getChildrenNodes(node, resolve){
      getOccupationChildren(node.value || 0).then(res=>{
        if (res.data.code === 100){
          let nodes = res.data.data
          nodes = nodes.map(item => ({
            value: item.id,
            label: item.name,
            leaf: item.level >= 3
          }))
          resolve(nodes)
        }
      })
    },
    handleSelect(val){
      console.log(val)
      if (val instanceof Array){
        this.$emit('select', val[val.length-1])
      }
    }
  }
}
</script>

<style scoped>

</style>
