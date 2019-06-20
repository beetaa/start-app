<template>
  <div id="app">
    <h1>欢迎来到 Vue.js 的世界</h1>
    <h2>{{ msg }}</h2>
    Name: <input v-model="name" type="text">
    <hello-component :name="name" :initialEnthusiasm="5" />
    <counter-component />
  </div>
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

<style>
h1, h2 {
  color: gray;
}
</style>