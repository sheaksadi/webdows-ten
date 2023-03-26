<script setup>
import {webStore} from "/stores/webStore.js";
import WinBtn from "./winBtn";

const store = webStore()
let alert = ref(null)


let props = defineProps({
  icon: {
    type: String,
    default: "ic:sharp-warning-amber"
  },
  barTime: {
    type: Number,
    default: 10
  },


})

onMounted(() => {
  // alert.value.style.top = (store.Window.innerHeight / 2 - alert.value.getBoundingClientRect().height / 2) + "px";
  // alert.value.style.left = (store.Window.innerWidth / 2 - alert.value.getBoundingClientRect().width / 2) + "px";
  console.log(store.Window.innerWidth / 2 - alert.value.getBoundingClientRect().width / 2)
  startProgressbar()
})

let progress = ref(0)
let alertCls = ref("")

function startProgressbar(){
  const interval = props.barTime*1000;

// calculate the increment value per millisecond
  const increment_per_millisecond = 100*100 / interval;

  let progressTime = setInterval(()=>{
    progress.value += increment_per_millisecond;
    if (progress.value > 100) progress.value = 100
    if (progress.value >= 100) {
      clearInterval(progressTime);

      setTimeout(()=>{

        onClose()
      },500)



    }
  },100)
}



const emit = defineEmits(['close'])

function onClose() {
  // alertCls.value = "alertWindowOut"
  if (alert.value){
    alert.value.classList.add('alertWindowOut')
    alert.value.classList.remove('alertWindow')

  }

  setTimeout(()=>{
    emit('close')
  },500)


}

let getProgress = computed(() => {
  return `width: ${progress.value}%`
})
</script>
<template>
  <div class="absolute h-32 w-96 md:w-[48rem] bg-slate-800 bg-opacity-50 transition-all duration-300 ease-linear alertWindow z-40 right-0 left-0 mx-auto "
       :class="alertCls"
       ref="alert">
    <div class="absolute top-0 w-full h-1 bg-cyan-700 ">
      <div class="bg-cyan-500 h-1 transition-all duration-300 ease-linear" :style="getProgress"></div>
    </div>
    <WinBtn icon-name="bi:x-lg" icon-size="4" btnCls="hover:bg-slate-700 w-8 h-8 absolute top-1 right-0 z-50 " @click="onClose"></WinBtn>
    <div class="w-full h-full flex-row flex">
      <div class="h-full w-24 bg-cyan-700 bg-opacity-10 flex items-center justify-center">
        <Icon :name="icon" class="text-white w-16 h-16"></Icon>
      </div>
      <div class="flex items-center justify-start pl-4">
        <slot></slot>
      </div>
    </div>

  </div>
</template>


<style scoped>
.alertWindow{
  animation: slide-down 300ms forwards;
}

.alertWindowOut{
  animation: slide-up 300ms forwards;
}

@keyframes slide-down {
  0% {
    top: -10rem;
  }
  100%{
    top: 1rem;
  }
}
@keyframes slide-up {
  0% {
    top: 1rem;
  }
  100%{
    top: -10rem;
  }
}

</style>