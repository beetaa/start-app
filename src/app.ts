import Vue from 'vue'
import Start from './page/Start.vue'

const v = new Vue({
  el: '#app',
  render: (h) => h(Start, { props: { msg: 'hello app!' } })
})