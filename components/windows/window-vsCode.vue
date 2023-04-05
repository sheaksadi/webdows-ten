<script setup>
import {webStore} from "/stores/webStore.js";
import Window from "../window";
import WindowsAlert from "../windowsAlert";

const store = webStore()
const alertOpen = ref(true)

onMounted(() => {


})

function atAlertClose() {
    store.vueExtensionWarning = true
    alertOpen.value = false
}
</script>

<template>

    <Window icon="vscode-icons:file-type-vscode" title="VS Code" class="">
        <suspense>
            <WindowsAlert v-if="store.isScreenMounted && !store.vueExtensionWarning && alertOpen" @close="atAlertClose"
                          icon="codicon:extensions">
                <h1 class="text-cyan-400">Add vue extension for code highlighting</h1>
            </WindowsAlert>
        </suspense>

        <iframe class="h-full w-full" src="https://github1s.com/sheaksadi/webdows-ten"></iframe>
    </Window>
</template>


<style scoped>

</style>