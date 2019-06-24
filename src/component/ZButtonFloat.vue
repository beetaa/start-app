<template lang="pug">
  div(:class="dynamicStyle").absolute.inline-flex.p-2.right-0.mr-2.text-white.bg-gray-500.rounded-full.cursor-pointer.opacity-75
    i(:class="`eva-${iconName}`").eva.text-xl
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    dynamicStyle(): string {
      const margin = this.position === 'top' ? `mt-${this.marginSize}` : `mb-${this.marginSize}`
      return `${this.position}-0 ${margin} hover:bg-${this.hoverColor}-500`
    }
  },
  props: {
    hoverColor: {
      default: 'teal',
      type: String
    },
    iconName: {
      default: 'list-outline',
      type: String
    },
    marginSize: {
      default: '2',
      type: String
    },
    position: {
      default: 'top',
      type: String
    }
  }
})
</script>
