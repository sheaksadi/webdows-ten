<template>
    <button :class="btnStyle" :id="btnId">
        <Icon v-if="iconName" :name="iconName" :class="iconStyle" :id="iconId"></Icon>
        <img v-if="imgPath" :src="imgPath">
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    iconSize: String,
    iconName: String,
    imgPath: String,
    size: {
        type: String,
        default: ""
    },
    btnCls: {
        type: String,
        default: ""
    },
    iconCls: {
        type: String,
        default: ""
    },
    btnId: {
        type: String
    },
    iconId: {
        type: String
    },
})
let btnStyle = computed(() => {
    return "w-" + props.size + " h-" + props.size + " flex items-center justify-center no-drag " + props.btnCls
})
let iconStyle = computed(() => {
    return 'text-white w-' + props.iconSize + ' h-' + props.iconSize + " " + props.iconCls
})
</script>

<style scoped>

</style>