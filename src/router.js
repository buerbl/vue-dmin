import Vue from 'vue';
import Rounter from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import User from './components/user/User.vue';
import Role from './components/user/Role.vue';
import Rolemanage from './components/user/Rolemanage.vue';
import Welcome from './components/Welcome.vue';
import './assets/css/global.css';

Vue.use(Rounter);

export default new Rounter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: 'welecome',
      children: [
        { path: '/welecome', component: Welcome },
        { path: '/user', component: User },
        { path: '/role', component: Role },
        { path: '/role-manage', component: Rolemanage },

      ],
    },
  ],
});
