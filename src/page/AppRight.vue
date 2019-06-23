<template lang="pug">
  div.flex.h-full.border-l(style={width: '18rem'})
    div.flex-auto
    div.flex.flex-col.w-10.text-white.items-stretch.cursor-pointer
      z-button-vertical(text='用户' iconName='person-outline' bgColor='orange')/
      z-button-vertical(text='笔记' iconName='book-outline' bgColor='blue')/
      z-button-vertical(text='课堂' iconName='monitor-outline' bgColor='purple')/
      z-button-vertical(text='小组' iconName='people-outline' bgColor='teal')/
      z-button-vertical(text='排名' iconName='trending-up-outline' bgColor='pink')/
      z-button-vertical(text='设置' iconName='settings-outline' bgColor='green')/
      z-button-vertical(text='帮助' iconName='question-mark-circle-outline' bgColor='gray')/
</template>

<script lang="ts">
import Vue from 'vue'

import ZButtonVertical from '../component/ZButtonVertical.vue'

export default Vue.extend({
  components: { ZButtonVertical }
})
</script>
