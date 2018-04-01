<template>
  <div class="container-modal-login" @click="closeLoginModal">
    <div class="modal-login" :class="{ active : modalActive }" @click="stopPropagation">
      <div class="title">
        Login
      </div>
      <div class="login-input-area">
        <div class="input-text">
            <input type="email" placeholder="rere@example.com" v-model="email">
        </div>
      </div>
      <div class="login-input-area">
          <div class="input-text">
              <input type="password" placeholder="password" v-model="password">
          </div>
      </div>
      <div @click="toRouter('terms')">회원가입</div>
      <button @click="login">로그인</button>
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
        this.$bus.$emit('toggleLoginModal', false)
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
}
</script>
<style>

</style>

