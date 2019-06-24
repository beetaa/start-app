<template lang="pug">
  div(@click="toggleControlButton(buttonName)" :class="dynamicStyle" class="flex-1 py-3 border-b-8 inline-flex items-center justify-center")
    i(:class="`eva eva-${iconName}`")
</template>

<script lang="ts">
import Vue from 'vue'

import { UI } from '../store/mutation_types'

export default Vue.extend({
  computed: {
    dynamicStyle(): string {
      const style = this.isActive
        ? `bg-${this.activeColor}-500 border-${this.activeColor}-700`
        : `bg-${this.bgColor}-500 border-${this.bgColor}-700`
      return `${style} hover:bg-${this.bgColor}-600 hover:border-${this.bgColor}-600 text-${this.textColor}`
    },
    isActive(): boolean {
      return this.$store.state.ui.controlButtons[this.buttonName]
    }
  },
  props: {
    buttonName: {
      default: '',
      type: String
    },
    bgColor: {
      default: 'teal',
      type: String
    },
    textColor: {
      default: 'white',
      type: String
    },
    activeColor: {
      default: 'orange',
      type: String
    },
    iconName: {
      default: 'options-outline',
      type: String
    }
  },
  methods: {
    toggleControlButton(buttonName: string): void {
      this.$store.commit(UI.prefix + UI.TOGGLE_CONTROL_BUTTON, buttonName)
    }
  }
})
</script>

