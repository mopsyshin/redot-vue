<template>
<div class="mypage-page-container">
        <div class="mypage-banner-section">
            <div class="button-box">
                <button class="btn-mypage-setting"><img src="../../assets/my-setting.svg" alt=""></button>
                <button class="btn-mypage-change-image"><img src="../../assets/my-camera.svg" alt=""></button>
                <button class="btn-mypage-follow">Follow +</button>
            </div>
        </div>
      <div class="container-fullsize" :class="{ fullsize: !rsbIsOpen}">
          <div class="mypage-initial">
              <img src="../../assets/user-img.png" alt="">
          </div>
          <div class="mypage-info">
              <div class="mypage-name">
                  {{ userInfo.displayName }}
              </div>
              <div class="mypage-desc">
              </div>
          </div>
          <div v-masonry 
           transition-duration="0s"
           item-selector=".post-list-item">
          <transition-group name="small-fade-in" mode="out-in" appear>
          <PostCard v-for="post in posts" 
                    :key="post.id"
                    v-masonry-tile 
                    class="post-list-item"
                    :post="post" 
                    />
          <div v-masonry-tile class="post-list-item skeleton" v-if="!postReady" v-for="(item, index) in 12" :key="index">
            <div class="mypage"></div>
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
            mypageInfo: [],
        }
    },
    computed: {
      userInfo() {
        return this.$store.state.user
      }
    },
    created() {
        this.getUserPost()
    },
    methods: {
        getUserPost() {
            this.postReady = false
            this.userName = this.$route.params.nickname
            db.collection('posts').where('author', '==' , this.userName).get().then(querySnapshot => {
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

