<template>
  <div id="app">
    <Gnb/>
      <router-view></router-view>
    <transition name="opacity" appear>
    <LoginModal v-if="loginModal"/>
    </transition>
  </div>
</template>

<script>
import Gnb from './components/Gnb/Gnb'
import LoginModal from './components/Signup/LoginModal'

export default {
  name: 'App',
  data() {
    return {
      loginModal: false,
    }
  },
  created() {
    this.$store.dispatch('getChannels')
    this.$store.dispatch('getUserInfo')
    this.$bus.$on('toggleLoginModal', this.toggleLoginModal)
  },
  methods: {
    toggleLoginModal(a) {
      this.loginModal = a;
    },
  },
  components: {
    Gnb: Gnb,
    LoginModal: LoginModal,
  }
};
</script>

<style lang="scss" src="./main.scss"></style>
