<template>
  <div id="app">
    <Gnb/>
    <transition name="fadeoutin" appear>
      <router-view></router-view>
    </transition>
    <transition name="opacity" appear>
    <LoginModal v-if="loginModal"/>
    </transition>
  </div>
</template>

<script>
import Gnb from './components/Gnb/Gnb'
import LoginModal from './components/Signup/LoginModal'
import { auth } from './firebase'

export default {
  name: 'App',
  data() {
    return {
      loginState: null,
      loginModal: false,
    }
  },
  created() {
    this.$bus.$on('toggleLoginModal', this.toggleLoginModal)
    this.$bus.$on('logout', this.logout)
  },
  mounted() {
    this.initLoginState()
  },
  methods: {
    initLoginState() {
      var currentLoginState
      auth.onAuthStateChanged( user => {
        if( user ) {
          this.loginState = true
          currentLoginState = this.loginState
          this.$bus.$emit('loginState', currentLoginState)
        } else {
          this.loginState = false
          currentLoginState = this.loginState
          this.$bus.$emit('loginState', currentLoginState)
        }
      })
    },
    toggleLoginModal(a) {
      this.loginModal = a;
    },
    logout() {
      auth.signOut().then(() => {
        this.loginState = false
        currentLoginState = this.loginState
        this.$bus.$emit('loginState', currentLoginState)
      }).catch(error => {

      });
    }
  },
  components: {
    Gnb: Gnb,
    LoginModal: LoginModal,
  }
};
</script>

<style lang="scss" src="./main.scss"></style>
