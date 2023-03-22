<template>
  <button :class="btnStyle" :id="btnId">
    <Icon :name="iconName" :class="iconStyle" :id="iconId"></Icon>
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  iconSize: String,
  iconName: String,
  size: {
    type : String,
    default: ""
  },
  btnCls: {
    type : String,
    default: ""
  },
  iconCls: {
    type : String,
    default: ""
  },
  btnId: {
    type : String
  },
  iconId: {
    type : String
  },
})
let btnStyle = computed(() => {
  return "w-"+props.size+" h-"+props.size+" flex items-center justify-center " + props.btnCls
})
let iconStyle = computed(() => {
  return 'text-white w-'+props.iconSize+' h-'+props.iconSize+ " " + props.iconCls
})
</script>

<style scoped>

</style>