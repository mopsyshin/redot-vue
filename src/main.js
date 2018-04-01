// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueSession from 'vue-session';
import {VueMasonryPlugin} from 'vue-masonry';
import _ from 'lodash';

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(VueSession)
Vue.use(VueMasonryPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
