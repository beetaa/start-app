<template lang="pug">
  div(:class="compClass")
    i(v-if="hasIcon" :class="`eva eva-${iconName} mr-1`")/ {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    compClass(): string {
      const colors = `bg-${this.bgColor}-500 border-${this.bgColor}-700 hover:bg-${this.bgColor}-600 hover:border-${this.bgColor}-600 text-${this.textColor}`
      return this.baseClass.join(' ') + ' ' + colors
    },
    hasIcon(): boolean {
      return this.iconName.length > 0
    }
  },
  data() {
    return {
      baseClass: ['flex-1', 'py-3', 'text-center', 'cursor-pointer', 'border-b-8']
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

<style lang="less" scoped>
</style>
