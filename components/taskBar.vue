<script setup>
import moment from 'moment';
import StartMenu from "./startMenu";
import WinBtn from "./winBtn";



let time = ref(moment().format("LT"))
let showStartMenu = ref(false)

onMounted(() => {
  setInterval(() => {
    time.value = moment().format("LT")
  },1000)
})

</script>

<template>
<div class="w-full h-10 bg-gray-900 bg-opacity-90 z-10 flex justify-between items-center backdrop-blur-2xl" style="vertical-align: bottom">
  <div class="absolute bottom-10 left-0 ">
    <StartMenu :open="showStartMenu"></StartMenu>
  </div>
  <div>
<!--    <button class="w-10 h-10 hover:bg-slate-800 group flex items-center justify-center">-->
<!--      <Icon name="teenyicons:windows-solid" class="text-white group-hover:text-cyan-300  w-5 h-5 " ></Icon>-->
<!--    </button>-->
    <WinBtn icon-size="5" size="10" btn-cls="hover:bg-slate-800 group" icon-cls="group-hover:text-cyan-300"
            icon-name="teenyicons:windows-solid"
            @click="()=>{showStartMenu = !showStartMenu}"
    ></WinBtn>

  </div>
  <div class="flex flex-row">
    <div class="h-10 w-20 hover:bg-slate-800 text-white flex items-center justify-center">{{time}}</div>
    <WinBtn icon-name="majesticons:comment-2-text-line" icon-size="6" size="10" btn-cls="hover:bg-slate-800 p-0"></WinBtn>
    <div class="h-10 w-2 bg-gray-900 border-l-[1px] hover:bg-gray-800 border-white"></div>
  </div>

</div>
</template>


<style scoped>

</style>