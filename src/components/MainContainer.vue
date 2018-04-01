<template>
  <div class="main-container">
    <div class="view-container">
    <transition name="main-view-transition" appear>
      <div class="main-view">
        <router-view name="mv"></router-view>
      </div>
    </transition>
      <div class="rsb-view">
        <router-view name="rsb"></router-view>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  created() {
    
  },

}
</script>

<style>
</style>


