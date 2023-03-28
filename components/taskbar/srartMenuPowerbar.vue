<script setup>
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
      <div v-for="btn in buttons" class="relative">
        <button class="startMenuPowerBtn" @click="()=>{atBtnClick(btn.name)}">
          <div class="w-12 h-12 flex justify-center items-center relative">
            <Icon class="w-6 h-6 text-white " :name="btn.icon"></Icon>
            <h1 class="text-white absolute left-12">{{ btn.name }}</h1>
          </div>
        </button>
        <div v-if="btn.name === 'Power' && showSHutDown" class="w-64  bg-gray-900  absolute z-40  shutDown" >
          <button class="startMenuPowerBtn">
            <div class="w-12 h-12 flex justify-center items-center relative">
              <Icon class="w-6 h-6 text-white " name="bi:power"></Icon>
              <h1 class="text-white absolute left-12 delay-500">ShutDown</h1>
            </div>
          </button>
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
  animation: slide-up 300ms forwards;
}

@keyframes slide-up {
  0% {
    height: 0rem;
    top: 0rem;
  }
  80%{
    height: 0rem;
    top: -3rem;
  }
  100%{
    height: 3rem;
    top: -3rem;
  }
}
</style>