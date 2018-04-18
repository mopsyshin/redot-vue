<template>
  <div class="container-fullsize channel-container">
    <div class="page-header">
      <div class="title">
        Channel
      </div>
    </div>
    <div class="channel-list">
        <div class="channel-list-item" v-for="(channel, index) in fullChannel" :key="index">
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
import { db } from '../../firebase';

  export default {
    data() {
      return {
        fullChannel: [],
      }
    },
    created() {
      this.getChannels();
    },
    methods: {
      isTop(index) {
        if ( index < 3 ) {
          return { 'font-size' : '20px', 'font-weight' : '700' }
        } else  {
          return { 'font-size' : '15px', 'font-weight' : '400' }
        }
      },
      getChannels() {
        var fullChannel = []
            db.collection('channel').orderBy("channel_created_date")
            .get().then( querySnapshot => {
              querySnapshot.forEach(doc => {
                fullChannel.push(doc.data())
              })
            }).then( () => {
              this.fullChannel = fullChannel
              var channelCount = this.fullChannel.length
              this.$store.commit({
                type: 'setChannelCount',
                channelCount: channelCount
              })
            })

      },
    }
  }
</script>
<style>

</style>

