<template lang="pug">
  div(@click="togglePanel(navName)" :class="dynamicStyle" class="w-1/4 py-3 text-center cursor-pointer border-b-8 select-none")
    i(v-if="hasIcon" :class="`eva eva-${iconName} mr-1`")/ {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'

import { UI } from '../store/mutation_types'

export default Vue.extend({
  computed: {
    dynamicStyle(): string {
      const style = this.isActive
        ? `bg-${this.bgColor}-600 border-${this.bgColor}-600`
        : `bg-${this.bgColor}-500 border-${this.bgColor}-700`
      return `${style} hover:bg-${this.bgColor}-600 hover:border-${this.bgColor}-600 text-${this.textColor}`
    },
    hasIcon(): boolean {
      return this.iconName.length > 0
    },
    isActive(): boolean {
      return this.$store.state.ui.leftPanels[this.navName]
    }
  },
  props: {
    navName: {
      default: '',
      type: String
    },
    bgColor: {
      default: 'gray',
      type: String
    },
    iconName: {
      default: '',
      type: String
    },
    text: {
      default: '按钮',
      type: String
    },
    textColor: {
      default: 'white',
      type: String
    }
  },
  methods: {
    togglePanel(panelName: string): void {
      this.$store.commit(UI.prefix + UI.TOGGLE_LEFT_PANEL, panelName)
    }
  }
})
</script>

<style lang="less" scoped>
</style>
