<script setup>
import moment from 'moment';
import StartMenu from "./startMenu";
import WinBtn from "./winBtn";
import {webStore} from "/stores/webStore.js";
const store = webStore()



let time = ref(moment().format("LT"))
let showStartMenu = ref(false)

onMounted(() => {
  window.document.onkeydown = atKeyPress


  setInterval(() => {
    time.value = moment().format("LT")
  },1000)
})
function outClicked(){
  if (showStartMenu.value){
    showStartMenu.value = false
  }
}


function atKeyPress(e){
  if (e.key === "OS"){
    showStartMenu.value = !showStartMenu.value
  }
}

</script>

<template>
<div class="w-full h-10 bg-gray-900 bg-opacity-90 z-10 flex justify-between items-center backdrop-blur-2xl" style="vertical-align: bottom" >
  <div class="absolute bottom-10 left-0 ">
    <StartMenu v-if="store.isScreenMounted" :open="showStartMenu" @outClick="outClicked"></StartMenu>
  </div>
  <div>
<!--    <button class="w-10 h-10 hover:bg-slate-800 group flex items-center justify-center">-->
<!--      <Icon name="teenyicons:windows-solid" class="text-white group-hover:text-cyan-300  w-5 h-5 " ></Icon>-->
<!--    </button>-->


    <WinBtn  icon-size="5" size="10" btn-cls="hover:bg-slate-800 group start-menu-not-close" icon-cls="group-hover:text-cyan-300 start-menu-not-close"
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