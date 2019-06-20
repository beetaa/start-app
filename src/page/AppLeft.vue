<template lang="pug">
  div.flex.flex-col.h-full
    //- 标签栏，根据用户点击切换显示状态
    div.flex
      //- 这里将用相应按钮组件代替
      div(class="hover:border-orange-500").flex-1.py-3.text-center.text-white.cursor-pointer.bg-orange-500.border-b-8.border-orange-700 LOGO
      div(class="hover:border-blue-500").flex-1.py-3.text-center.text-white.cursor-pointer.bg-blue-500.border-b-8.border-blue-700.inline-flex.items-center.justify-center
        i.eva.eva-github.mr-1/ 任务
      div(class="hover:border-purple-500").flex-1.py-3.text-center.text-white.cursor-pointer.bg-purple-500.border-b-8.border-purple-700 资源
      div(class="hover:border-teal-500").flex-1.py-3.text-center.text-white.cursor-pointer.bg-teal-500.border-b-8.border-teal-700 运行
    //- 内容栏，根据标签栏状态切换显示内容
    div.flex-auto.bg-gray-200

</template>

<script lang="ts">
import Vue from 'vue'

// 使用枚举来存储组件状态
export default Vue.extend({})
</script>
