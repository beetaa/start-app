<template lang="pug">
  div.flex.h-full
    div(v-if="isVisible").flex-1(style={width: '16rem'})
      div(v-if="isUser").h-full.bg-orange-200
        p 用户
      div(v-if="isNote").h-full.bg-blue-200
        p 笔记
      div(v-if="isRoom").h-full.bg-purple-200
        p 课堂
      div(v-if="isGroup").h-full.bg-teal-200
        p 小组
      div(v-if="isRank").h-full.bg-pink-200
        p 排名
      div(v-if="isSetting").h-full.bg-green-200
        p 设置
      div(v-if="isHelp").h-full.bg-gray-200
        p 帮助
    div.flex.flex-col.w-10.text-white.items-stretch.cursor-pointer
      z-button-vertical(panelName="user" text='用户' iconName='person-outline' bgColor='orange')/
      z-button-vertical(panelName="note" text='笔记' iconName='book-outline' bgColor='blue')/
      z-button-vertical(panelName="room" text='课堂' iconName='monitor-outline' bgColor='purple')/
      z-button-vertical(panelName="group" text='小组' iconName='people-outline' bgColor='teal')/
      z-button-vertical(panelName="rank" text='排名' iconName='trending-up-outline' bgColor='pink')/
      z-button-vertical(panelName="setting" text='设置' iconName='settings-outline' bgColor='green')/
      z-button-vertical(panelName="help" text='帮助' iconName='question-mark-circle-outline' bgColor='gray')/
</template>

<script lang="ts">
import Vue from 'vue'

import ZButtonVertical from '../component/ZButtonVertical.vue'

export default Vue.extend({
  components: { ZButtonVertical },
  computed: {
    isVisible(): boolean {
      return this.$store.state.ui.rightPanels['visible']
    },
    isUser(): boolean {
      return this.$store.state.ui.rightPanels['user']
    },
    isNote(): boolean {
      return this.$store.state.ui.rightPanels['note']
    },
    isRoom(): boolean {
      return this.$store.state.ui.rightPanels['room']
    },
    isGroup(): boolean {
      return this.$store.state.ui.rightPanels['group']
    },
    isRank(): boolean {
      return this.$store.state.ui.rightPanels['rank']
    },
    isSetting(): boolean {
      return this.$store.state.ui.rightPanels['setting']
    },
    isHelp(): boolean {
      return this.$store.state.ui.rightPanels['help']
    }
  }
})
</script>
