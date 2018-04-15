<template>
  <div class="home-rsb">
      <div class="rsb-section">
        <div class="section-title">
          Notice
        </div>
        <div class="section-list">
          <div class="section-list-item" v-for="contents in notice" :key="contents.key">
            {{ contents }}
          </div>
        </div>
      </div>
      <div class="rsb-section">
        <div class="section-title">
          Active User
        </div>
        <div class="section-display-number">
          {{ activeUser }}
        </div>
      </div>
      <div class="rsb-section">
        <div class="section-title">
          문의
        </div>
        <div class="section-list">
          <div class="section-list-item">
            버그 리포트
          </div>
          <div class="section-list-item">
            서비스 개선 제안
          </div>
          <div class="section-list-item">
            문의하기
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeUser: '21,412',
      notice: [
        'Redot 공지 준비중'
      ],
    }
  }
  
}
</script>

<style>

</style>


