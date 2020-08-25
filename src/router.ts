import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/main',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "main" */ './views/MainPage.vue'),
      children: [
        {
          path: '/sum',
          name: 'sum',
          component: () => import(/* webpackChunkName: "sum" */ './views/SumData/index.vue'),
        },
        {
          path: '/version',
          name: 'version',
          component: () => import(/* webpackChunkName: "version" */ './views/VersionData/index.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import(/* webpackChunkName: "user" */ './views/UserManage/index.vue'),
        },
        {
          path: '/group',
          name: 'group',
          component: () => import(/* webpackChunkName: "group" */ './views/GroupManage/index.vue'),
        },
        {
          path: '/log',
          name: 'log',
          component: () => import(/* webpackChunkName: "log" */ './views/ManageLog.vue'),
        },
        {
          path: '/ad',
          name: 'ad',
          component: () => import(/* webpackChunkName: "log" */ './views/AppManage/index.vue'),
        },
        {
          path: '/fund',
          name: 'fund',
          component: () => import(/* webpackChunkName: "log" */ './views/FundManage/index.vue'),
        },
        {
          path: '/cert',
          name: 'cert',
          component: () => import(/* webpackChunkName: "log" */ './views/CertManage/index.vue'),
        },
      ],
    },
  ],
});
