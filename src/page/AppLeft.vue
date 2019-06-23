<template lang="pug">
  div.flex.flex-col.h-full(style={width: '20rem'})
    //- 标签栏，根据用户点击切换显示状态
    div.flex
      z-button-nav(text='LOGO' iconName='' bgColor='orange')/
      z-button-nav(text='任务' iconName='map-outline' bgColor='blue')/
      z-button-nav(text='资源' iconName='cube-outline' bgColor='purple')/
      z-button-nav(text='运行' iconName='flash-outline' bgColor='teal')/
    //- 内容栏，根据标签栏状态切换显示内容
    div.flex-auto
      div.h-full.bg-teal-100

</template>

<script lang="ts">
import Vue from 'vue'

import ZButtonNav from '../component/ZButtonNav.vue'

export default Vue.extend({
  components: { ZButtonNav }
})
</script>
