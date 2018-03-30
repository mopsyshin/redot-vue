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
      loginState: false,
    }
  },
  created() {
    let loginState = this.loginState
    bus.$emit('loginState', loginState)
  },
};
</script>

<style>
body, p, span, h1, h2, h3, h4, h5, h6, li, input {
  margin: 0;
  padding: 0;
  color: #666666;
  font-family: "Apple SD Gothic Neo", sans-serif, "marguen gothic", 'gulim', '맑은고딕';
}
div {
  box-sizing: border-box;
}
</style>
