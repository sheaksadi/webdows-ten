<script setup>
import TaskBar from "./components/taskBar";
import Window from "./components/window";
import WinBtn from "./components/winBtn";
// import Cv from "./components/windows/cv"
import {createApp, defineAsyncComponent} from "vue"


import {webStore} from "./stores/webStore.js";
import WindowsAlert from "./components/windowsAlert";
useHead({
  titleTemplate: () => {
    return 'Sheak Sadi';
  }
})
const store = webStore()


//
// let Cv = computed(() => {
//   return import("./components/windows/cv")
// })
let Cv = defineAsyncComponent(() => import("./components/windows/window-aboutMe"))

let mousePos = reactive({
  top: 110,
  left: 110,
  clicked: false,
  draggable: ""
})

let app = createApp(Cv)

const screen = ref(null)
const winMount = ref(null)
const open = ref(true)




onMounted(() => {



  // const wrapper = window.document.createElement("div")
  // app.mount(wrapper)
  // screen.value.appendChild(wrapper)

  store.isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  store.Window = window
  store.screen = screen.value
  store.winMount = winMount.value
  setInterval(() => {
    for (let element of window.document.getElementsByClassName("header")) {
      if (!store.moveAbleElements.includes(element)) {
        store.mouseMoveHandler(element)
        store.moveAbleElements.push(element)
      }
    }
  }, 500)
  store.isScreenMounted = true
})


// $.ajax({
//   type: 'GET',
//   url: 'https://wakatime.com/share/@sheaksadi/ea566eee-e06b-421e-b58f-e5e51101e66d.json',
//   dataType: 'jsonp',
//   success: function(response) {
//     console.log(response.data);
//   },
// });

// let desktopApp =  ref([
//   store.apps.find(app => app.name === "cv"),
//   store.apps.find(app => app.name === "contact"),
// ])
function openApp(appName , dbClick) {
  if (!store.isDeviceMobile && !dbClick) return
  let app = store.apps.find(app => app.name === appName)
  if (app) {
    store.openApp(appName)
  }
}


</script>

<template>

  <div id="screen" class="h-screen w-full bg-transparent flex flex-col items-end overflow-hidden "  ref="screen">

    <div ref="winMount" class=" h-full w-full relative ">
      <div class="w-20 h-20 hover:bg-slate-500 hover:bg-opacity-40 flex justify-center items-center flex-col mt-2" @click="()=>{openApp('aboutMe',false)}" @dblclick="()=>{openApp('aboutMe', true)}">
        <img  src="./assets/icons/imageres_102-2.png">
        <h1 class="text-white shadow-black shadow-2xl noSelect">Sadi.txt</h1>
      </div>
      <div class="w-20 h-20 hover:bg-slate-500 hover:bg-opacity-40 flex justify-center items-center flex-col mt-2" @click="()=>{openApp('contact',false)}" @dblclick="()=>{openApp('contact', true)}">
        <img  src="./assets/icons/imageres_102-2.png">
        <h1 class="text-white shadow-black shadow-2xl noSelect">Contact.txt</h1>
      </div>
      <!--      <component :is="Cv"/>-->
      <WindowsAlert v-if="store.isScreenMounted && store.isDeviceMobile &&  open" @close="open = false" icon="ic:twotone-system-security-update-warning" bar-time="30">
        <div class="">
          <h1 class="text-white">Better Website Experience on Computer</h1>
          <h1 class="text-gray-300 text-sm">Due to size and power restrictions, most features do not work on mobile. For a better experience, please view the website on a computer.</h1>
        </div>

      </WindowsAlert>
    </div>
    <div v-if="store.isDeviceMobile" class="w-full h-10"></div>

    <TaskBar ></TaskBar>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
  overflow: hidden; /* Hide scrollbars */
  background-image: url("/assets/w-10-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  font-family: "Segoe UI", Arial, sans-serif;

}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                   supported by Chrome and Opera */
}
</style>