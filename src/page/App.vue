<template lang="pug">
  div.flex.overflow-hidden.h-screen
    div(style={width: '20rem'})
      //- 左面板
      app-left/
    div.relative.flex-auto
      //- 主区，代码区
    div.border-l(style={width: '18rem'})
      //- 右面板
</template>

<script lang="ts">
import Vue from 'vue'

import AppLeft from './AppLeft.vue'

export default Vue.extend({
  components: { AppLeft }
})
</script>

<style lang="less" scoped>
</style>
