<script setup>
import {webStore} from "/stores/webStore.js";

const store = webStore();


defineProps({
  open: Boolean,
})
let canHover = ref(true)
let showSHutDown = ref(false)

let hoverClass = computed(() => {
  if (canHover.value) {
    return "hover:w-64"
  }
  return ""
})

function refuseHover() {
  if (!canHover.value) {
    canHover.value = true
  } else {
    canHover.value = false
    setTimeout(() => {
      canHover.value = true
    }, 4000)
  }

}

let isMouseOver = ref(false)

let buttons = ref([
      {
        name: "Profile",
        icon: "healthicons:ui-user-profile"
      },
      {
        name: "Settings",
        icon: "material-symbols:settings-outline-rounded"
      },
      {
        name: "Documents",
        icon: "ion:document-outline"
      },
      {
        name: "Power",
        icon: "bi:power"
      },
    ]
)
function atBtnClick(name){
  if (name === "Power"){
    showSHutDown.value = !showSHutDown.value
  }
  if (name === "Profile"){
    window.open("https://github.com/sheaksadi", "_blank")
  }
}


</script>


<template>
  <div class="h-full w-12  flex flex-col group justify-between delay-300 transition-all duration-100 ease-linear
   overflow-hidden hover:shadow-xl drop-shadow-xl hover:bg-gray-700 absolute"
       :class="hoverClass"
       @mouseover="()=>{ isMouseOver = true}" @mouseout="()=>{isMouseOver = false}"
  >

    <div>
      <button class="startMenuPowerBtn " @click="refuseHover">
        <div class="w-12 h-12 flex justify-center items-center relative">
          <Icon class="w-6 h-6 text-white " name="system-uicons:menu-hamburger"></Icon>
          <h1 class="text-white absolute left-12">START</h1>
        </div>


      </button>
    </div>
    <div class=" ">
        <div class="relative">
            <button class="startMenuPowerBtn" @click="()=>{atBtnClick('Profile')}">
                <div class="w-12 h-12 flex justify-center items-center relative">
                    <Icon class="w-6 h-6 text-white " name="healthicons:ui-user-profile"></Icon>
                    <h1 class="text-white absolute left-12">Profile</h1>
                </div>
            </button>
        </div>

        <div class="relative">
            <button class="startMenuPowerBtn" @click="()=>{atBtnClick('Settings')}">
                <div class="w-12 h-12 flex justify-center items-center relative">
                    <Icon class="w-6 h-6 text-white " name="material-symbols:settings-outline-rounded"></Icon>
                    <h1 class="text-white absolute left-12">Settings</h1>
                </div>
            </button>
        </div>

        <div class="relative">
            <button class="startMenuPowerBtn" @click="()=>{atBtnClick('Documents')}">
                <div class="w-12 h-12 flex justify-center items-center relative">
                    <Icon class="w-6 h-6 text-white " name="ion:document-outline"></Icon>
                    <h1 class="text-white absolute left-12">Documents</h1>
                </div>
            </button>
        </div>

        <div class="">
            <button class="startMenuPowerBtn relative z-20" @click="()=>{showSHutDown = !showSHutDown} ">
                <div class="w-12 h-12 flex justify-center items-center relative ">
                    <Icon class="w-6 h-6 text-white " name="bi:power"></Icon>
                    <h1 class="text-white absolute left-12 z-40">Power</h1>
                </div>
            </button>
            <div class="bottom-[3rem] absolute  transition-all shutDown" v-if="showSHutDown">
                <div  class="w-64  bg-gray-900   "  @click="()=>{store.systemPower = 'shutdown'}">
                    <button class="startMenuPowerBtn" >
                        <div class="w-12 h-12 flex justify-center items-center relative">
                            <Icon class="w-6 h-6 text-white " name="bi:power"></Icon>
                            <h1 class="text-white absolute left-12 delay-500 z-10" >ShutDown</h1>
                        </div>
                    </button>
                </div>
                <div  class="w-64  bg-gray-900   " @click="()=>{store.systemPower = 'restart'}" >
                    <button class="startMenuPowerBtn">
                        <div class="w-12 h-12 flex justify-center items-center relative">
                            <Icon class="w-6 h-6 text-white " name="codicon:debug-restart"></Icon>
                            <h1 class="text-white absolute left-12 delay-500 z-10">Restart</h1>
                        </div>
                    </button>
                </div>
            </div>

        </div>




    </div>
  </div>
</template>


<style scoped>
.startMenuPowerBtn {
  @apply w-full h-12 hover:bg-slate-600 bg-opacity-70 ease-linear flex justify-start items-center
}
.shutDown{
  animation: slide-up 400ms forwards;
}

@keyframes slide-up {
  0% {
      height: 0rem;

  }
  100%{
    height: 6rem;
  }
}
</style>