<template>
  <div class="container-fullsize channel-container">
    <div class="page-header">
      <div class="title">
        Channel
      </div>
    </div>
    <div class="channel-list">
        <div class="channel-list-item" v-for="(channel, index) in channels" :key="channel.index">
          <div class="index" :style="isTop(index)">
            {{ index + 1 }}
          </div>
          <div class="channel-name" :style="isTop(index)">
            #{{ channel.channel_name }}
          </div>
          <div class="graph-bar" :style="{ 'background-color' : channel.channel_color }"></div>
          <div class="count">

          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      channels() {
        return this.$store.state.channels
      },
    },
    methods: {
      isTop(index) {
        if ( index < 3 ) {
          return { 'font-size' : '20px', 'font-weight' : '700' }
        } else  {
          return { 'font-size' : '15px', 'font-weight' : '400' }
        }
      }
    }
  }
</script>
<style>

</style>

