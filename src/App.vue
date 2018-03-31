<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MainContainer from './components/MainContainer';

export default {
  name: 'App',
  data() {
    return {
      loginState: null,
    }
  },
  created() {
    this.$bus.$on('loginState', this.checkLogin)
  },
  mounted() {
    this.initLoginState()
  },
  methods: {
    initLoginState() {
      this.loginState = false
      let currentLoginState = this.loginState;
      console.log('app init = ' + currentLoginState)
      this.$bus.$emit('loginState', currentLoginState)
    },
    checkLogin(state) {
      console.log('app check = ' + state)
    }
  },
};
</script>

<style lang="scss" src="./main.scss"></style>
