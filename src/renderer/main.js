import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

import '../../node_modules/material-icon-font/iconfont/material-design-iconfont.css';

Vue.use(Vuetify);

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
