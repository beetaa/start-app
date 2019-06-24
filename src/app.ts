import './asset/style/app.css'

import Vue from 'vue'
import App from './page/App.vue'

import store from './store'

const v = new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
