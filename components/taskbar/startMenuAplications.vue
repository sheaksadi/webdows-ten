<script setup>

import {webStore} from "/stores/webStore";

const store = webStore()


let isMouseOver = ref(false)


let winStyle = computed(() => {
  return isMouseOver.value ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800 " : " scrollbar-track-transparent scrollbar-thumb-transparent"
})

function openApp(name) {
  store.openApp(name)
}

</script>


<template>
  <div class="w-[17rem] h-full ml-12  scrollbar overflow-y-scroll  delay-100 scrollbar-thin  "
       :class="winStyle"
       @mouseover="()=>{isMouseOver = true}" @mouseout="()=>{isMouseOver = false}"

  >
    <div class="pt-1 pl-2 w-full h-full " v-for="app in store.apps" :key="app.name">
      <button @click="() => {store.openApp(app.name)}"
              class="w-full h-10 hover:bg-slate-700 flex justify-start items-center text-white">
        <Icon :name="app.icon" class="w-6 h-6 m-2"></Icon>
        {{ app.title }}
      </button>
    </div>


  </div>
</template>


<style scoped>
/*.scrollbar-thin {*/
/*  width: 2px;*/
/*}*/
/*.scrollbar-thin::-webkit-scrollbar {*/
/*  width: 2px;*/
/*  height: 8px;*/
/*}*/
</style>