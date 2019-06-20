<template lang="pug">
div#app
  h1 Welcome to PUG 世界
  h2 {{ msg }}
  input(
    v-model="name"
    type="text"
  )
  hello-component(
    ":name"="name"
    ":initialEnthusiasm"="5"
  )/
  counter-component/
</template>

<script lang="ts">
import Vue from 'vue'
import CounterComponent from '../component/Counter.vue'
import HelloComponent from '../component/Hello.vue'
export default Vue.extend({
  props: ['msg'],
  data () {
    return {
      name: 'World'
    }
  },
  components: {
    HelloComponent,
    CounterComponent
  },
  mounted () {
    console.log('Mounted!', this.msg)
  }
})
</script>

<style lang="less" scoped>
@base: #a9f8ab;

h1, h2 {
  color: @base;
}
</style>