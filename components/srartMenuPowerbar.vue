<template>
  <div class="h-full w-12  flex flex-col group justify-between delay-300 transition-all duration-100 ease-linear
   overflow-hidden hover:shadow-xl drop-shadow-xl hover:bg-gray-700 "
       :class="hoverClass"
  @mouseover="()=>{ isMouseOver = true}" @mouseout="()=>{isMouseOver = false}"
  >

    <div>
      <button class="startMenuPowerBtn " @click="refuseHover">
        <div class="w-12 h-12 flex justify-center items-center relative" >
          <Icon class="w-6 h-6 text-white " name="system-uicons:menu-hamburger"></Icon>
          <h1 class="text-white absolute left-12" >START</h1>
        </div>


      </button>
    </div>
    <div class="" >
      <div v-for="btn in buttons">
        <button class="startMenuPowerBtn">
          <div class="w-12 h-12 flex justify-center items-center relative" >
            <Icon class="w-6 h-6 text-white " :name="btn.icon"></Icon>
            <h1 class="text-white absolute left-12" >{{btn.name}}</h1>
          </div>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  open: Boolean,
})
let canHover = ref(true)

let hoverClass = computed(() => {
  if (canHover.value){
    return "hover:w-64"
  }
  return ""
})

function refuseHover () {
  if (!canHover.value){
    canHover.value = true
  }else {
    canHover.value = false
    setTimeout(()=>{
      canHover.value = true
    },4000)
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





</script>

<style scoped>
.startMenuPowerBtn{
  @apply w-full h-12 hover:bg-slate-600 bg-opacity-70 ease-linear flex justify-start items-center
}
</style>