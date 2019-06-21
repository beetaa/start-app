<template lang="pug">
  div.flex.overflow-hidden.h-screen
    //- 左
    app-left/
    //- 中
    app-main/
    //- 右
    app-right/
</template>

<script lang="ts">
import Vue from 'vue'

import AppLeft from './AppLeft.vue'
import AppMain from './AppMain.vue'
import AppRight from './AppRight.vue'

export default Vue.extend({
  components: { AppLeft, AppMain, AppRight }
})
</script>

<style lang="less" scoped>
</style>
