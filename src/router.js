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

const router = new Rounter({
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

// 路由导航卫士
router.beforeEach((to, from, next) => {
  // to 访问
  // from 从哪里来的路径
  // next 函数，表示放行

  if (to.path === '/login') return next();
  // 获取token
  const tokenstr = window.sessionStorage.getItem('token');
  if (!tokenstr) return next('/login');
  next();
});


export default router;
