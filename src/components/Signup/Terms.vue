<template>
    <div class="terms-container">
    <div class="header">
        <div class="title">
            회원가입
        </div>
        <div class="signup-navigation">
            
        </div>
        </div>
        <div class="contents-wrapper">
        <div class="contents-header">
            <div class="contents-title">
            Redot 서비스 이용약관 동의
            </div>
            <CheckBox/>
        </div>
        <div class="contents-box">
            {{ useterms }}
        </div>
        </div>
        <div class="contents-wrapper">
        <div class="contents-header">
            <div class="contents-title">
            Redot 커뮤니티 규정
            </div>
            <CheckBox/>
        </div>
        <div class="contents-box">
            {{ communityrule }}
        </div>
        </div>
        <div class="contents-wrapper">
        <div class="contents-header">
            <div class="contents-title">
            Redot 개인정보 이용약관
            </div>
            <CheckBox/>
        </div>
        <div class="contents-box">
            {{ privacyterms }}
        </div>
        </div>
        <div class="bottom-right-button-group">
        <button class="btn-negative" @click="back">돌아가기</button>
        <button class="btn-positive" @click="toRouter('register')">동의하기</button>
        </div>
    </div>
</template>

<script>
import { db } from '../../firebase';
import CheckBox from '../GlobalModules/CheckBox'

export default {
  data() {
    return {
      useterms: '',
      communityrule: '',
      privacyterms: '',
    }
  },
  created() {
    this.getTerms()
  },
  methods: {
    getTerms() {
        db.collection('terms').get().then(querySnapshot => {
          var terms = []
          querySnapshot.forEach(doc => {
            terms.push(doc.data());
            this.useterms = terms[0].useterms
            this.communityrule = terms[0].communityrule
            this.privacyterms = terms[0].privacyterms
          });
        });
    },
    back() {
      this.$router.go(-1)
    },
    toRouter( routeName ) {
        this.$router.push( { name : routeName } )
    }
  },
  components: {
    CheckBox: CheckBox,
  },
}
</script>

<style>

</style>


