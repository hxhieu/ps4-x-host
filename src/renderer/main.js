import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

import '../../node_modules/material-icon-font/iconfont/material-design-iconfont.css';
import '../../node_modules/vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  theme: {
    primary: '#4fc3f7',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
    success: '#388e3c',
  },
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
