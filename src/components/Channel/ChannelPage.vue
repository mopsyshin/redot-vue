<template>
  <div class="container-fullsize channel-page-container">
    <transition name="banneraction" appear>
        <div class="channel-banner">

        </div>
    </transition>
      {{ channel_name }}
      <div v-masonry 
           transition-duration="0s"
           item-selector=".post-list-item">
          <div v-masonry-tile 
               class="post-list-item upload-card" 
               @click="uploadCardFunc">
            @{{ channel_name }}<br/>
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
</template>

<script>
import {db} from '../../firebase.js'
import PostCard from '../GlobalModules/PostCard'

export default {
    data() {
        return {
            channel_name : '',
            posts: [],
        }
    },
    created() {
        this.getChannelPost()
    },
    methods: {
        getChannelPost() {
            this.postReady = false
            this.channel_name = this.$route.params.channelname
            var docRef = db.collection('posts').where('channel', '==' ,this.channel_name).orderBy("date", "desc").limit(20).get().then(querySnapshot => {
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
