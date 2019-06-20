import './asset/style/app.css'

import Vue from 'vue'
import App from './page/App.vue'

const v = new Vue({
  el: '#app',
  render: (h) => h(App)
})
