import './asset/style/app.css'

import Vue from 'vue'
import Landing from './page/Landing.vue'

const v = new Vue({
  el: '#landing',
  render: (h) => h(Landing, { props: { msg: 'hello landing page!' } })
})
