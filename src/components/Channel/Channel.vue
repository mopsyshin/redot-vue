<template>
  <div class="container-fullsize channel">
    channel
    <button @click="addChannel">
      addChannel
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      addChannel() {
        this.$router.push('addChannel')
      },
    }
  }
</script>
<style>

</style>

