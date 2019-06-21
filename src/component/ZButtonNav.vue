<template lang="pug">
  div(class=compClass) {{ text }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    compClass(): string {
      const colors = `bg-${this.bgColor}-500 border-${this.bgColor}-700 hover:border-${this.bgColor}-500 text-${this.textColor}`
      const ret = this.baseClass.join(' ') + ' ' + colors
      alert(ret)
      return ret
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
