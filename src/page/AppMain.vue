<template lang="pug">
  div.relative.flex-auto
    div#blocklyDiv.w-full.h-full
    div.z-10
      z-button-float(iconName="list-outline" hoverColor="orange")/
      Z-button-float(iconName="corner-up-right-outline" position="bottom")/
      z-button-float(iconName="corner-up-left-outline" position="bottom" marginSize="16")/
</template>

<script lang="ts">
import Vue from 'vue'

import ZButtonFloat from '../component/ZButtonFloat.vue'

export default Vue.extend({
  components: { ZButtonFloat }
})
</script>
