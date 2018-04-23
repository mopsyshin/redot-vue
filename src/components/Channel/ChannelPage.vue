<template>
  <div class="channel-page-container">
        <div class="channel-banner-section">
            <div class="button-box">
                <button class="btn-channel-change-image"><img src="../../assets/my-camera.svg" alt=""></button>
                <button class="btn-channel-subscribe">Subscribe +</button>
            </div>
        </div>
      <div class="container-fullsize" :class="{ fullsize: !rsbIsOpen}">
          <div class="channel-initial" :style="{ borderColor : chColor}">
              <div :style="{ color : chColor }">
                  {{ chName.slice(0,1) }}
              </div>
          </div>
          <div class="ch-info">
              <div class="ch-name" :style="{ color : chColor }">
                  #{{ chName }}
              </div>
              <div class="ch-desc">
                {{ chDesc }}
              </div>
          </div>
          <div v-masonry 
           transition-duration="0s"
           item-selector=".post-list-item">
          <div v-masonry-tile 
               class="post-list-item upload-card" 
               @click="uploadCardFunc">
            @{{ chName }}<br/>
            채널에<br/>
            글 하나<br/>
            써 볼래요?
          </div>
          <transition-group name="small-fade-in" mode="out-in" appear>
          <PostCard v-for="post in posts" 
                    :key="post.id"
                    v-masonry-tile 
                    class="post-list-item"
                    :post="post" 
                    />
          <div v-masonry-tile class="post-list-item skeleton" v-if="!postReady" v-for="(item, index) in 12" :key="index">
            <div class="channel"></div>
              <div class="title1">
              </div>
              <div class="title2">
              </div>
              <div class="author">
              </div>
              <div class="footer">
              </div>
          </div>
          </transition-group>
      </div>
      </div>
  </div>
</template>

<script>
import {db} from '../../firebase.js'
import PostCard from '../GlobalModules/PostCard'

export default {
    data() {
        return {
            posts: [],
            channelInfo: [],
            chName : '',
            chColor: '#ccc',
            chDesc: '',
            chAdmin: '',
            chDate: '',
        }
    },
    created() {
        this.getChannelPost()
    },
    methods: {
        getChannelPost() {
            this.postReady = false
            this.chName = this.$route.params.channelname
            db.collection('channel').where('channel_name', '==' , this.chName).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.channelInfo.push(doc.data())
                });
            }).then(()=> {
                this.chColor = this.channelInfo[0].channel_color
                this.chDesc = this.channelInfo[0].channel_desc
                this.chAdmin = this.channelInfo[0].channel_admin
                this.chDate = this.channelInfo[0].channel_created_date
            })
            db.collection('posts').where('channel', '==' ,this.chName).orderBy("date", "desc").limit(20).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.posts.push(doc.data())
                });
            }).then(()=> {
                this.postReady = true
            })
        }
    },
    components: {
        PostCard: PostCard
    }
}
</script>

<style>

</style>
