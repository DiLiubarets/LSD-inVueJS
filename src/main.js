import Vue from 'vue'
import App from './App.vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import 'bootstrap/dist/css/bootstrap.css'
Vue.use(Chartkick.use(Chart))


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
