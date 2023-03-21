<template>
  <button :class="btnStyle">
    <Icon :name="iconName" :class="iconStyle" ></Icon>
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
})
let btnStyle = computed(() => {
  console.log(props.size)
  return "w-"+props.size+" h-"+props.size+" flex items-center justify-center " + props.btnCls
})
let iconStyle = computed(() => {
  console.log(props.iconSize)
  return 'text-white w-'+props.iconSize+' h-'+props.iconSize+ " " + props.iconCls
})
</script>

<style scoped>

</style>