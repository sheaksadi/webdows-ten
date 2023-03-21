<template>
<div>
  <div class="w-[52rem] h-[32rem] bg-cyan-500 absolute " >
    <div class="w-full h-10 bg-slate-700 header flex items-center justify-between">
      <div class="flex items-center p-2 ">
        <Icon class="text-amber-500 w-8 h-8 mr-2" :name="icon" />
        <h1 >{{title}}</h1>
      </div>
      <div class="flex flex-row-reverse">
        <button class="winUtilBtn hover:bg-red-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-4 h-4" name="bi:x-lg"></Icon></button>
        <button class="winUtilBtn hover:bg-gray-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-3 h-3" name="bi:square"></Icon></button>
        <button class="winUtilBtn hover:bg-gray-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-4 h-4" name="bi:dash-lg"></Icon></button>

      </div>

    </div>

    <div class="w-full h-full bg-green-500">
      <slot></slot>
    </div>


  </div>
</div>
</template>

<script setup>
defineProps({
  title: String,
  icon: String
})



</script>

<style scoped>

</style>