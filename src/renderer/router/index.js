import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: require('@/components/Dashboard').default,
    },
    {
      path: '/dns',
      name: 'dns-server',
      component: require('@/components/DnsServer').default,
    },
    {
      path: '/web',
      name: 'web-server',
      component: require('@/components/WebServer').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
