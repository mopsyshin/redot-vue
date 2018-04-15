<template>
  <div class="container-modal-login" @click="closeLoginModal">
    <div class="modal-login" :class="{ active : modalActive }" @click="stopPropagation">
      <div class="logo-box">
        <img class="modal-logo" src="../../assets/img-logo.svg" alt="">
      </div>
      <div class="login-input-area">
        <div class="input-text">
            <input type="email" placeholder="rere@example.com" v-model="email" v-focus>
        </div>
      </div>
      <div class="login-input-area">
          <div class="input-text">
              <input type="password" placeholder="password" v-model="password" @keyup.enter="login">
          </div>
      </div>
      <div class="modal-func">
        <div>
          <span>
            <input type="checkbox">
            로그인 상태 유지
          </span>
        </div>
        <div>
          <span @click="toRouter('terms')">
            회원가입
          </span>
          /
          <span @click="toRouter('findpw')">
            비밀번호 찾기
          </span>
        </div>
      </div>
      <button class="btn-login" @click="login">로그인</button>
    </div>
  </div>
</template>

<script>
import { auth } from '../../firebase'

export default {
  data() {
    return {
      modalActive: false,
      email: '',
      password: '',
    }
  },
  mounted() {
    document.body.style.overflow='hidden';  
    this.$nextTick( () => {
      this.modalActive = true
    })
  },
  beforeDestroy() {
    document.body.style.overflow='auto';  
  },
  methods: {
    toRouter( routeName ) {
      this.$bus.$emit('toggleLoginModal', false)
      this.$router.push({ name : routeName })
    },
    login() {
      var email = this.email
      var password = this.password
      auth.signInWithEmailAndPassword( email, password ).then( () => {
        this.closeLoginModal()
      }).catch( error => {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorCode + errorMessage)
      })
    },
    closeLoginModal() {
      this.$bus.$emit('toggleLoginModal', false)
    },
    stopPropagation(event) {
      event.stopPropagation();
    }
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      }
    }
  }
}
</script>
<style>

</style>

