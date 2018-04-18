// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import _ from 'lodash'
import { db, auth } from './firebase'
import {VueMasonryPlugin} from 'vue-masonry'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(VueMasonryPlugin)
Vue.use(VueTextareaAutosize)

// 모든 컴포넌트에서 공유하는 data 및 methods Mixin
Vue.mixin({
  data() {
    return {
      postReady: false,
    }
  },
  computed: {
    rsbIsOpen() {
      return this.$store.state.rsbState
    },
    loginState() {
      return this.$store.state.loginState
    }
  },
  methods: {
    toRouter( routeName ) {
      this.$router.push({name:routeName})
    },
    back() {
      this.$router.go(-1)
    },
    uploadCardFunc() {
      if (this.loginState == true) {
        this.toRouter('upload')
      } else {
        this.toggleLoginModal()
      }
    },
    toggleLoginModal() {
      this.$bus.$emit('toggleLoginModal', true)
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
