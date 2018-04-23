<template>
  <div id="app">
    <Gnb/>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <transition name="opacity" appear>
    <LoginModal v-if="loginModal"/>
    <GlobalModal v-if="isShownGlobalModal"/>
    </transition>
  </div>
</template>

<script>
import Gnb from './components/Gnb/Gnb'
import LoginModal from './components/Signup/LoginModal'
import GlobalModal from './components/GlobalModules/GlobalModal'

export default {
  name: 'App',
  data() {
    return {
      loginModal: false,
      isShownGlobalModal: false,
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
    GlobalModal: GlobalModal,
  }
};
</script>

<style lang="scss">
  @import 'main.scss';
</style>
