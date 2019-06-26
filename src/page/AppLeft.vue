<template lang="pug">
  div.flex.flex-col.h-full(style={width: '20rem'})
    //- 标签栏，根据用户点击切换显示状态
    div.flex
      z-button-nav(navName="home" text='LOGO' iconName='' bgColor='orange')/
      z-button-nav(navName="task" text='任务' iconName='map-outline' bgColor='blue')/
      z-button-nav(navName="box" text='宝盒' iconName='cube-outline' bgColor='purple')/
      z-button-nav(navName="run" text='运行' iconName='flash-outline' bgColor='teal')/
    //- 内容栏，根据标签栏状态切换显示内容
    div.flex-1
      div(v-if="isHome").h-full.bg-orange-200
        p 主页
      div(v-if="isTask").h-full.bg-blue-200
        p 任务
      div(v-if="isBox").h-full.bg-purple-200
        p 宝盒
      div(v-if="isRun").h-full.bg-teal-200
        <!-- 模拟器 -->
        div.w-full.bg-teal-100(style={height: '25rem'})
        <!-- 控制栏 -->
        div.flex.w-full.cursor-pointer
          z-button-control(buttonName="setting" iconName="options-outline")/
          z-button-control(buttonName="share" iconName="share-outline")/
          z-button-control(buttonName="backward" iconName="rewind-left-outline")/
          z-button-control(buttonName="play" iconName="play-circle-outline" activeColor="pink")/
          z-button-control(buttonName="forward" iconName="rewind-right-outline")/
          z-button-control(buttonName="fullscreen" iconName="expand-outline")/
          z-button-control(buttonName="detail" iconName="log-out-outline")/
        <!-- 信息区 -->
        div

</template>

<script lang="ts">
import Vue from 'vue'

import ZButtonControl from '../component/ZButtonControl.vue'
import ZButtonNav from '../component/ZButtonNav.vue'

export default Vue.extend({
  components: { ZButtonControl, ZButtonNav },
  computed: {
    isHome(): boolean {
      return this.$store.state.ui.leftPanels['home']
    },
    isTask(): boolean {
      return this.$store.state.ui.leftPanels['task']
    },
    isBox(): boolean {
      return this.$store.state.ui.leftPanels['box']
    },
    isRun(): boolean {
      return this.$store.state.ui.leftPanels['run']
    }
  }
})
</script>
