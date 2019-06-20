import './asset/style/app.css'

import Vue from 'vue'
import Start from './page/Start.vue'

const v = new Vue({
  el: '#landing',
  render: (h) => h(Start, { props: { msg: 'hello landing!' } })
})