<template>
  <div class="container-gnb">
    <div class="gnb-left">
      <img @click="toRouter('home')" class="gnb-logo" src="../../assets/img-logo.svg" alt="">
      <div class="wrapper-search-input">
        <img src="../../assets/gnb-search.svg" alt="">
        <input type="text" placeholder="관심있는 채널을 찾아보세요">
      </div>
    </div>
    <!-- Gnb right side -->
    <transition name="fadeoutin" mode="out-in" appear>
      <!-- login Session -->
      <div class="gnb-right login-state"  v-if="loginState">
        <div class="wrapper-noti">
          <button>
            <img src="../../assets/gnb-noti.svg" alt="">
          </button>
          <div class="noti-count">
            {{ notiCount }}
          </div>
        </div>
        <div class="user-box" @click="toRouter('mypage')">
          <span><b>mopsy.D</b> 님</span>
          <div class="user-icon-box"></div>
        </div>
        <button class="gnb-more" @click="logout">
          <img src="../../assets/gnb-more.svg" alt="">
        </button>
      </div>
    </transition>
    <transition name="fadeoutin" mode="out-in" appear>
      <!-- non login Session -->
      <div class="gnb-right logout-state" v-if="!loginState">
        <span @click="toRouter('channel')">채널 둘러보기</span>
        <span class="btn-signin" @click="toggleLoginModal">SIGN IN / SIGN UP</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Gnb',
  data() {
    return {
      notiCount: 12,
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    toggleLoginModal() {
      this.$bus.$emit('toggleLoginModal', true)
    },
    login() {
      this.$bus.$emit('login')
    },

    toRouter( routeName ) {
      this.$router.push( { name : routeName })
    }
  },
}
</script>

<style></style>