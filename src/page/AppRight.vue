<template lang="pug">
  div.flex.h-full.border-l(style={width: '18rem'})
    div.flex-auto
    div.flex.flex-col.w-10.text-white.items-stretch.cursor-pointer
      div.flex-1.p-3.border-r-4.bg-orange-500.border-orange-700
        i.eva.eva-person-outline/ 用户
      div.flex-1.p-3.border-r-4.bg-blue-500.border-blue-700
        i.eva.eva-book-outline/ 笔记
      div.flex-1.p-3.border-r-4.bg-purple-500.border-purple-700
        i.eva.eva-monitor-outline/ 课堂
      div.flex-1.p-3.border-r-4.bg-teal-500.border-teal-700
        i.eva.eva-people-outline/ 小组
      div.flex-1.p-3.border-r-4.bg-pink-500.border-pink-700
        i.eva.eva-trending-up-outline/ 排名
      div.flex-1.p-3.border-r-4.bg-green-500.border-green-700
        i.eva.eva-settings-outline/ 设置
      div.flex-1.p-3.border-r-4.bg-gray-500.border-gray-700
        i.eva.eva-question-mark-circle-outline/ 帮助
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
