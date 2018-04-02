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

export default {
  name: 'App',
  data() {
    return {
      loginModal: false,
    }
  },
  created() {
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
