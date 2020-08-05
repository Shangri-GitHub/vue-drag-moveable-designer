import Vue from 'vue'
import App from './App.vue'
import VueDesignMercury from "vue-design-mercury"
Vue.use(VueDesignMercury);
new Vue({
  el: '#app',
  render: h => h(App)
})
