<template>
  <div class="main-container">
    <Gnb/>
    <router-view></router-view>
  </div>
</template>

<script>
import Gnb from './Gnb/Gnb'
export default {
  components: {
    Gnb: Gnb,
  }
}
</script>

<style>

</style>


