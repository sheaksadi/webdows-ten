<script setup>
import Window from "../window";
import moment from "moment/moment";

const props = defineProps({
  uuid: String,
})
onMounted(() => {
  console.log("ajkgbfiseydg", props.uuid)
})
</script>


<template>

  <Window :uuid="uuid" title="CV" icon="mdi:file-document-outline" win-cls="h-10">
    <div class="w-full h-full bg-blue-500">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ex ipsum iure nobis, quasi qui quidem quis quod
      rerum sit. Ab blanditiis consectetur culpa debitis dicta doloribus est excepturi exercitationem fugit hic illo in,
      ipsum iusto minus molestias natus nostrum odio odit placeat praesentium qui quis quod, recusandae saepe sint
      suscipit veniam veritatis. Aliquid commodi consectetur distinctio earum esse explicabo, harum ipsam molestias,
      omnis, placeat provident quaerat. Aliquid deserunt doloremque eius esse inventore pariatur perferendis qui
      quibusdam vero. Blanditiis, consequatur culpa cupiditate doloremque eligendi laboriosam laudantium libero nostrum
      odit quae quasi quia quisquam quos rem tenetur veniam vero voluptate voluptates.

    </div>
  </Window>


</template>


<style scoped>

</style>