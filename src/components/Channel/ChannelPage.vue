<template>
  <div class="container-fullsize channel-page-container">
      {{ channel_name }}
  </div>
</template>

<script>
export default {
    data() {
        return {
            channel_name : '',
        }
    },
    created() {
        this.getChannelInfo()
    },
    methods: {
        getChannelInfo() {
            this.channel_name = this.$route.params.channelname
            var docRef = db.collection('channel').doc(this.channel_name)
        }
    }
}
</script>

<style>

</style>
