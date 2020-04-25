import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import axios from 'axios';
import qs from 'qs';
import VueCookies from 'vue-cookies';


Vue.use(VueCookies);
Vue.config.productionTip = false;
// axios.defaults.baseURL = 'http://47.105.202.146:8080';
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.interceptors.request.use((config) => {
  console.log('config', config);
  config.headers.authorization = window.sessionStorage.getItem('token');

  console.log(config);
  return config;
});

Vue.prototype.$http = axios;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
