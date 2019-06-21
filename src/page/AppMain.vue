<template lang="pug">
  div.relative.flex-auto
    div#blocklyDiv.w-full.h-full
    div.z-10
      div.absolute.inline-flex.right-0.top-0.p-2.mr-2.mt-2.text-white.bg-gray-500(class="hover:bg-teal-500").rounded-full.cursor-pointer.opacity-75
        i.eva.eva-list-outline.text-xl
      div.absolute.inline-flex.right-0.bottom-0.p-2.mr-2.mb-2.text-white.bg-gray-500(class="hover:bg-teal-500").rounded-full.cursor-pointer.opacity-75
        i.eva.eva-corner-up-right-outline.text-xl
      div.absolute.inline-flex.right-0.bottom-0.p-2.mr-2.mb-16.text-white.bg-gray-500(class="hover:bg-teal-500").rounded-full.cursor-pointer.opacity-75
        i.eva.eva-corner-up-left-outline.text-xl
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
