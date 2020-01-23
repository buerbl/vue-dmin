import Vue from 'vue';
import Rounter from 'vue-router';
import Login from './components/Login.vue';

Vue.use(Rounter);

export default new Rounter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
  ],
});
