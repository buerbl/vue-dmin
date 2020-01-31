import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from 'axios';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'https://api.apiopen.top/getTangPoetry?page=1&count=20';
axios.interceptors.request.use(config =>{
  console.log(config);
  config.headers.Authorization  = window.sessionStorage.getItem('token');
  return config;
})
Vue.prototype.$http = axios;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
