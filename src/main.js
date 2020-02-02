import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'github-buttons/dist/buttons.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
