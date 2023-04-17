<script setup>

import {webStore} from "/stores/webStore";

const store = webStore()


let isMouseOver = ref(false)


let winStyle = computed(() => {
    return isMouseOver.value ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800 " : " scrollbar-track-transparent scrollbar-thumb-transparent"
})
const smallLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let orderedApps = computed(() => {
    let apps = []
    apps.push({title: "My Info", isHeader: true})
    for (const app of store.apps) {
        if (app.invisible) {
            console.log(app)
            continue
        }
        if (app.isAppAboutMe) {
            apps.push(app)
        }

    }


    for (const letter of smallLetters) {
        for (const app of store.apps) {
            if (app.invisible) {
                continue
            }
            if (app.name.startsWith(letter)) {
                if (!apps.find(e => e.title === letter.toUpperCase())) {
                    apps.push({title: letter.toUpperCase(), isHeader: true})
                }
                apps.push(app)
            }
        }
    }


    return apps
})

function openApp(app) {
    if (app.isHeader) {
        return
    }
    store.openApp(app.name)
}

</script>


<template>
    <div class="w-[17rem] h-full ml-12 overflow-y-scroll  delay-100 scrollbar-thin  "
         :class="winStyle"
         @mouseover="()=>{isMouseOver = true}" @mouseout="()=>{isMouseOver = false}"

    >
        <div class="pt-1 pl-2 w-full h-10 " v-for="app in orderedApps" :key="app.name">
            <button @click="() => {openApp(app)}"
                    class="w-full h-10 hover:bg-slate-700 flex justify-start items-center text-white">
                <!--        <img v-if="app.imgPath" class="ml-2" :src="app.imgPath">-->
                <Icon v-if="app.icon" :name="app.icon" class="w-6 h-6 ml-2"></Icon>
                <h1 class="ml-2 ">{{ app.title }}</h1>
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