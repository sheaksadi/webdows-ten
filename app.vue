<script setup>
import TaskBar from "./components/taskBar";
import {webStore} from "./stores/webStore.js";
import WindowsAlert from "./components/windowsAlert";
import {useFetch} from "nuxt/app";
import WindowsLoading from "~/components/windowsLoading.vue";
import Shutdown from "~/components/shutdown.vue";


useHead({
    titleTemplate: () => 'Sheak Sadi',
});

const store = webStore();
const screen = ref(null);
const winMount = ref(null);
const open = ref(true);
let isShuttingDown = ref(true);

onMounted(async () => {
    store.isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    store.Window = window;
    store.screen = screen.value;
    store.winMount = winMount.value;
    window.document.onmousedown = store.atScreenClick;
    store.isScreenMounted = true;

    store.catPic = await useFetch('https://api.thecatapi.com/v1/images/search').data
    setInterval(() => {
        for (let element of window.document.getElementsByClassName("header")) {
            if (!store.moveAbleElements.includes(element)) {
                store.mouseMoveHandler(element);
                store.moveAbleElements.push(element);
            }
        }
    }, 500);
});

function openApp(appName, dbClick) {
    if (!store.isDeviceMobile && !dbClick) return;
    let app = store.apps.find(app => app.name === appName);
    if (app) {
        store.openApp(appName);
    }
}
</script>

<template>
    <div id="screen" ref="screen" class="h-screen w-full bg-transparent  overflow-hidden">

        <div class="w-full h-full flex flex-col items-end" v-if="store.systemPower === 'on'">
            <div ref="winMount" class="h-full w-full relative">
                <div class="w-20 h-20 hover:bg-slate-500 hover:bg-opacity-40 flex justify-center items-center flex-col mt-2"
                     @click="()=>{openApp('aboutMe',false)}" @dblclick="()=>{openApp('aboutMe', true)}">
                    <Icon class="w-12 h-12 text-white" name="bxs:file-pdf"></Icon>
                    <h1 class="text-white text-sm shadow-black shadow-2xl noSelect">Sadi.pdf</h1>
                </div>
                <div class="w-20 h-20 hover:bg-slate-500 hover:bg-opacity-40 flex justify-center items-center flex-col mt-2"
                     @click="()=>{openApp('contact',false)}" @dblclick="()=>{openApp('contact', true)}">
                    <Icon class="w-12 h-12 text-white" name="ic:outline-email"></Icon>
                    <h1 class="text-white text-sm shadow-black shadow-2xl noSelect">Contact.exe</h1>
                </div>
                <WindowsAlert v-if="store.isScreenMounted && store.isDeviceMobile && open" bar-time="30"
                              icon="ic:twotone-system-security-update-warning" @close="open = false">
                    <div class="">
                        <h1 class="text-white">Better Website Experience on Computer</h1>
                        <h1 class="text-gray-300 text-sm">Due to size and power restrictions, most features do not work
                            on mobile. For a better experience, please view the website on a computer.</h1>
                    </div>
                </WindowsAlert>
            </div>
            <div v-if="store.isDeviceMobile" class="w-full h-10"></div>
            <TaskBar></TaskBar>
        </div>
     <Shutdown v-if="store.systemPower !== 'on'"></Shutdown>


    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
    overflow: hidden;
    background-image: url("/assets/w-10-bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    font-family: "Segoe UI", Arial, sans-serif;
}

.noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>