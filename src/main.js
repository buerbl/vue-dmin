import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/element.js';
import has from './plugins/btnPermissions.js';
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
  return config;
});


// http response 响应拦截器 登录过期重定向
axios.interceptors.response.use(response => {
  console.info("response", response)
  switch (response.data.code) {
    case 504:
      Vue.prototype.$message.error('登录已经过期，请重新登录')
      setTimeout(function () {
        router.replace({
          path: '/login'
          // 登录成功后跳入浏览的当前页面
          // query: {redirect: router.currentRoute.fullPath}
        })
      }, 500)
      break;
    case 503:
    case 502:
    case 501:
    case 502:
    case 500:
      Vue.prototype.$message.error(response.data.data);
      break;
  }

  return response
},
  error => {
    return Promise.reject(error)
  })

Vue.prototype.$http = axios;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
