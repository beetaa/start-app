<template lang="pug">
  div(:class="dynamicStyle").flex-1.p-3.border-r-4
    i(v-if="hasIcon" :class="`eva eva-${iconName}`")/ {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    dynamicStyle(): string {
      return `bg-${this.bgColor}-500 border-${this.bgColor}-700 hover:bg-${this.bgColor}-600 hover:border-${this.bgColor}-600 text-${this.textColor}`
    },
    hasIcon(): boolean {
      return this.iconName.length > 1
    }
  },
  props: {
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
  }
})
</script>
