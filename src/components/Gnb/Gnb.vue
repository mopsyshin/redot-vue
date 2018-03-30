<template>
  <div class="container-gnb">
    <div class="gnb-left">
      <img class="gnb-logo" src="../../assets/img-logo.svg" alt="">
      <div class="wrapper-search-input">
        <img src="../../assets/gnb-search.svg" alt="">
        <input type="text" placeholder="관심있는 채널을 찾아보세요">
      </div>
      
    </div>
    
    <div class="gnb-right">

      <div class="login-state" v-if="loginState">
        <div class="wrapper-noti">
          <img src="../../assets/gnb-noti.svg" alt="">
        </div>
        <div class="wrapper-user-info">
          <span>Mopsy</span>님
          <div class="user-icon">

          </div>
        </div>
        <div class="gnb-more">
          <img src="../../assets/gnb-more.svg" alt="">
        </div>
      </div>

      <div class="logout-state" v-if="!loginState">
        <span>채널 둘러보기</span>
        <span class="btn-signin">SIGN IN / SIGN UP</span>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'Gnb',
  data() {
    return {
      loginState: true,
    }
  },
  created() {
    bus.$on('loginState', (loginState) => {
        this.loginState = loginState
    })
  },
}
</script>

<style scoped>
.container-gnb {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  height: 56px;
  box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.06);
}
.gnb-left, .gnb-right, .login-state, .logout-state {
  display: flex;
  align-items: center;
}
.container-gnb .gnb-left {
  width: 80%;
}
.container-gnb .gnb-right {
  font-size: 12px;
}
.gnb-logo {
  width: 26px;
}
.wrapper-search-input {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1058px;
  height: 38px;
  background-color: #f8f8f8;
  border-radius: 100px;
  padding: 7px 16px;
  margin-left: 30px;
  
}
.wrapper-search-input input {
  background-color: transparent;
  border: none;
  width: calc(100% - 32px);
  font-size: 16px;
  margin-left: 12px;
}
.wrapper-search-input input::placeholder {
  color: #bbb;
}
.wrapper-search-input input:focus {
  outline: none;
}
.login-state > div {
  margin: 10px;
}
.wrapper-noti {

}
.logout-state span {
  margin: 15px;
  cursor: pointer;
}
.logout-state span.btn-signin {
  font-weight: 800;
}
</style>