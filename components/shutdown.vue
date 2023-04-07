<script setup>
import {webStore} from "/stores/webStore.js";
import WindowsLoading from "~/components/windowsLoading.vue";

const store = webStore();

let showRestart = ref(false)
let isBlackScreen = ref(false)
let text = ref("Shutting Down")


onMounted(() => {
    if (store.systemPower === "shutdown") {
        setTimeout(() => {
            console.log("shutdown")
            // store.Window.close()
            isBlackScreen.value = true
        }, 5000)
    }
    if (store.systemPower === "restart") {
        text.value = "Restarting"
        setTimeout(() => {
            showRestart.value = true
            setTimeout(() => {
                store.systemPower = "on"
            }, 5000)
        }, 3000)
    }

})



</script>

<template>
    <div class="h-screen w-full">
        <div class="fixed bg-cyan-500 h-full w-full  flex items-center justify-center" style="z-index: 100" v-if="!showRestart && !isBlackScreen" >
            <div class="relative h-16 flex items-end ">
                <WindowsLoading></WindowsLoading>
                <h1 class="text-white text-2xl">{{text}}</h1>
            </div>
        </div>
        <div class="fixed bg-black h-full w-full flex-col flex items-center justify-center " style="z-index: 100" v-if="showRestart">
            <div class="h-60 w-24 flex justify-center ">
                <Icon name="bi:windows" class="text-cyan-400 w-24 h-24"></Icon>
            </div>
            <div class="relative flex items-end w-24">
                <WindowsLoading></WindowsLoading>
            </div>
        </div>
        <div v-if="isBlackScreen" class="bg-black w-full h-full flex justify-center items-center" @click="()=>{store.systemPower = 'on'; isBlackScreen = false}">
            <h1 class="text-white">Well this is awkward isn't it ?</h1>
            <div class="absolute bottom-0 right-0 text-gray-400 cursor-pointer hover:underline" @click="store.Window.open('https://finn-thorben.me/')">website inspired by <span class="text-cyan-400" >finn</span></div>
        </div>
    </div>

</template>

<style scoped>

</style>