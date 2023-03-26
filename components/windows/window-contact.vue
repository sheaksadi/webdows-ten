<script setup>
import Window from "../window";
import {webStore} from "/stores/webStore.js";

const store = webStore()


let contacts = ref([
  {
    name: "Github",
    icon: "mdi:github",
    link: "https://github.com/sheaksadi",
    newWindow: true,
    siteUserName: "sheaksadi"
  },
  {
    name: "Discord",
    icon: "ic:outline-discord",
    link: "https://discord.com/users/446224188592881665",
    newWindow: true,
    siteUserName: "sheaksadi#2743"
  },
  {
    name: "Email",
    icon: "ic:outline-email",
    link: "mailto:sheaksadi12345@gmail.com",
    newWindow: false,
    siteUserName: "sheaksadi12345@gmail.com"
  },
])

function atBtnClick(contact){
  if (contact.newWindow){
    window.open(contact.link, "_blank")
  }else {
    window.open(contact.link)
  }

}



</script>

<template>

  <Window icon="ic:outline-email" title="Contact">
    <div class="w-full h-full bg-slate-900 flex justify-center items-center flex-col">
      <div class="w-80 flex justify-start">
        <h1 class="text-white text-4xl pl-2">Contact Me</h1>
      </div>
      <suspense>

        <div class="p-2 flex gap-2 flex-col">

          <div class="flex-row flex items-center bg-gray-600 cursor-pointer group relative p-2 w-80 rounded-xl hover:rounded-none transition-all duration-100 ease-linear"  v-for="contact in contacts" :key="contact.name" @click="()=>{atBtnClick(contact)}">
            <button class="w-12 h-12 ">
              <Icon class="text-white w-12 h-12 group-hover:text-cyan-400" :name="contact.icon"></Icon>
            </button>
            <h1 class="text-white ml-2 text-xl">{{contact.siteUserName}}</h1>

            <div class="absolute bg-cyan-400 left-[0rem] w-1.5 h-0  group-hover:h-full transition-all group-hover:duration-300 ;"></div>
            <span v-if="!store.isDeviceMobile" class="sidebar-tooltip group-hover:scale-100">{{contact.name}}</span>
          </div>


        </div>
      </suspense>

    </div>

  </Window>
</template>



<style scoped>
.sidebar-tooltip {
  @apply absolute w-auto p-2 m-2 min-w-max left-[20rem] rounded-md shadow-md
  text-white bg-green-600
   font-bold
  transition-all duration-300 scale-0 origin-left;
}
</style>