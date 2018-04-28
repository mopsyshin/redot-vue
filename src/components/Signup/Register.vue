<template>
    <div class="terms-container">
      <div class="page-header">
        <div class="title">
            정보입력
        </div>
        <div class="signup-navigation">
            
        </div>
    </div>
    <div class="page-contents">
    <div class="register-input-area">
        <div class="input-label">
            이메일
        </div>
        <div class="input-text">
            <input type="email" placeholder="rere@example.com" v-model="email">
            <p class="msg-err">* 로그인 아이디 및 인증메일 전송을 위해 <br/>정확히 기재해 주시기 바랍니다.</p>
        </div>
    </div>
    <div class="register-input-area">
        <div class="input-label">
            닉네임
        </div>
        <div class="input-text">
            <input type="text" placeholder="최대 8자" v-model="nickname">
            <p class="msg-err"></p>
        </div>
    </div>
    <div class="register-input-area">
        <div class="input-label">
            비밀번호
        </div>
        <div class="input-text">
            <input type="password" placeholder="사용할 비밀번호 입력" v-model="password">
            <p class="msg-err">* 비밀번호는 영어+숫자+특수문자가<br/>
   각각 1개 이상 포함되어 있어야 합니다.</p>
        </div>
    </div>
    <div class="register-input-area">
        <div class="input-label">
            비밀번호 확인
        </div>
        <div class="input-text">
            <input type="password" placeholder="비밀번호 재입력" v-model="passwordConfirm">
            <p class="msg-err"></p>
        </div>
    </div>
    </div>
    
    <div class="bottom-right-button-group">
        <button class="btn-negative" @click="back">돌아가기</button>
        <button class="btn-positive" @click="submit" :disabled="submitProcess">완료</button>
    </div>
    </div>
</template>

<script>
import { auth } from '../../firebase';
import { db } from '../../firebase';
import CheckBox from '../GlobalModules/CheckBox'

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      submitProcess: false,
    }
  },
  created() {
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    submit() {
        this.submitProcess = true
        var email = this.email
        var password = this.password
        auth.createUserWithEmailAndPassword(email, password).then( user => {
            user.updateProfile({
                displayName: this.nickname
                }).then(function() {
                this.addUserToFirestore()
                }).catch(function(error) {
                // An error happened.
                });
        }).catch( error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage + errorCode)
            this.submitProcess = false
        })
    },
    addUserToFirestore() {
        const ref = db.collection('users').doc()
        ref.set({
            id: ref.id,
            email: this.email,
            nickname: this.nickname,
            date: moment().format('YYYY-MM-DD, HH:mm:ss'),
          }).then(() => {
                this.toRouter('home')
            }).catch( error => {
                alert(error)
                this.submitProcess = false
            })
    }
  },
  components: {
    CheckBox: CheckBox,
  },
}
</script>

<style>

</style>


