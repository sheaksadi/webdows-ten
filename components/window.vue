<script setup>
import WinBtn from "./winBtn";
import {webStore} from "/stores/webStore.js";
const store = webStore()


let props = defineProps({
  title: String,
  icon: String,
  uuid: String,
  winCls: {
    type : String,
    default: ""
  },
  // fullScreen:{
  //   type: Boolean,
  //   default: true
  // }
})

let fullScreen = ref(false)


let winStyle = computed(() => {
  return fullScreen.value ? "w-full h-full" : "w-[52rem] h-[32rem] absolute"
})
let fullScreenIcon = computed(() => {
  return fullScreen.value ? "mingcute:restore-line" : "bi:square"
})
let fullScreenIconSize = computed(() => {
  return fullScreen.value ? "4" : "3"
})
function closeApp() {
  store.openedApps[props.uuid].instance.unmount()
  delete store.openedApps[props.uuid];
}

</script>

<template>
<div class=""  :class="winStyle" >
  <suspense>
    <div class="w-full h-8 bg-slate-700 header flex items-center justify-between "  >
      <div class="flex items-center p-2 ">
        <Icon class="text-amber-500 w-6 h-6 mr-2" :name="icon" />
        <h1 >{{title}}</h1>
      </div>
      <div class="flex flex-row-reverse">

        <WinBtn  icon-name="bi:x-lg" icon-size="4" btnCls="hover:bg-red-600 w-12 h-8" @click="closeApp"></WinBtn>
        <WinBtn :icon-name="fullScreenIcon" :icon-size="fullScreenIconSize" btnCls="hover:bg-gray-600 w-12 h-8" @click="()=>{fullScreen = !fullScreen}"></WinBtn>
        <WinBtn icon-name="bi:dash-lg" icon-size="4" btnCls="hover:bg-gray-600 w-12 h-8"></WinBtn>
        <!--        <button class="winUtilBtn hover:bg-red-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-4 h-4" name="bi:x-lg"></Icon></button>-->
        <!--        <button class="winUtilBtn hover:bg-gray-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-3 h-3" name="bi:square"></Icon></button>-->
        <!--        <button class="winUtilBtn hover:bg-gray-600 w-12 h-10 flex items-center justify-center"><Icon class="text-white w-4 h-4" name="bi:dash-lg"></Icon></button>-->

      </div>

    </div>

  </suspense>

    <div class="w-full h-full bg-green-500">
      <slot></slot>
    </div>


</div>
</template>



<style scoped>

</style>