// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueSession from 'vue-session';
import {VueMasonryPlugin} from 'vue-masonry';
import _ from 'lodash';
import { db, auth } from './firebase'

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(VueSession)
Vue.use(VueMasonryPlugin)

// 모든 컴포넌트에서 공유하는 data 및 methods Mixin
Vue.mixin({
  data() {
    return {
      loginState: null,
    }
  },
  created() {
    this.initLoginState()
  },
  methods: {
    initLoginState() {
      var currentLoginState
      auth.onAuthStateChanged( user => {
        if( user ) {
          this.loginState = true
          currentLoginState = this.loginState
        } else {
          this.loginState = false
          currentLoginState = this.loginState
        }
      })
    },
    logout() {
      auth.signOut().then(() => {
        this.loginState = false
        currentLoginState = this.loginState
      }).catch(error => {

      });
    },
    back() {
      this.$router.go(-1)
    },
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
