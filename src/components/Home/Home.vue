<template>
  <div class="home" :class="{'leave-container':leaveContainer}">
    <transition name="banneraction" appear>
    <div class="home-banner" v-if="bannerState">
      <div class="service-message">
        커뮤니티 생태계에 새로운 점을 찍다
      </div>
      <div class="sub-message">
        커뮤니티 생태계에 새로운 점을 찍다,<br/>
        기존 커뮤니티와 차원이 다른 리닷을 소개합니다!
      </div>
      <div class="banner-button-group">
        <button @click="toggleLoginModal">SIGN IN / SIGN UP</button>
        <button>리닷이 궁금하니?</button>
      </div>
    </div>
    </transition>
    <div class="container-fullsize" :class="{ fullsize: !rsbIsOpen}">
      <div class="home-title-label">
        Trending Channels
        <span class="span-more" @click="toRouter('channel')">
          More +
        </span>
      </div>
      <div class="trending-channel-list">
        <div class="channel-list-item" @click="toChannelPage(channel.channel_name)" v-if="channelReady" v-for="channel in channels" :key="channel.channel_name" :style="{ backgroundColor : channel.channel_color}">
          #{{ channel.channel_name }}
        </div>
        <div class="channel-list-item skeleton" v-if="!channelReady" v-for="(item, index) in 10" :key="index">
          <div></div>
        </div>
      </div>  
      <div class="home-title-label">
        Trending Posts
      </div>
      <div v-masonry 
           transition-duration="0s"
           item-selector=".post-list-item">
          <div v-masonry-tile 
               class="post-list-item upload-card" 
               @click="uploadCardFunc">
            @{{ recoCh }}<br/>
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
import { db } from '../../firebase';
import moment from 'moment';
import _ from 'lodash';
import PostCard from '../GlobalModules/PostCard';

var next

export default {
    name: 'Home',
    data() {
      return {
        posts: [],
        leaveContainer: false,
        next: {},
      }
    },
    computed: {
      bannerState() {
        return this.$store.state.bannerState
      },
      channels() {
        return this.$store.state.channels
      },
      recoCh() {
        return this.$store.state.recoCh
      },
      channelReady() {
        return this.$store.state.channelReady
      }
    },
    created() {
      this.getPosts();
      document.addEventListener('scroll', this.onScroll );
    },
    beforeDestroy() {
      document.removeEventListener('scroll', this.onScroll, false);
    },
    methods: {
      uploadCardFunc() {
        if (this.loginState == true) {
          this.toRouter('upload')
        } else {
          this.toggleLoginModal()
        }
      },
      loadmore() {
        this.next.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.posts.push(doc.data())
          })
        })
        return this.next.get().then(querySnapshot => {
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
          this.next = db.collection("posts")
                  .orderBy("date", "desc")
                  .startAfter(lastVisible)
                  .limit(20);
        }).catch(err => {
            var message = "마지막 포스트입니다"
            this.$bus.$emit('finalScroll', message)
        })
      },

      // 한번 스크롤을 감지한 이후엔 300ms 이후 스크롤을 감지합니다
      onScroll: _.debounce( function() {
        
        function getScrollY() {
          var scrOfX = 0, scrOfY = 0;
          if( typeof( window.pageYOffset ) == 'number' ) {
            //Netscape compliant
            scrOfY = window.pageYOffset;
          } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
          } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
          }
          return scrOfY;
        };
        var docHeight = document.body.offsetHeight;
        var winHeight = window.innerHeight;
        var currentScroll = getScrollY();
        var pos = docHeight - (winHeight + currentScroll);
        if ( pos < 100 ) {
          this.loadmore();
        }
      }, 100),
      toggleLoginModal() {
         this.$bus.$emit('toggleLoginModal', true)
      },
      toChannelPage(channelname) {   
            this.$router.push({ name: 'channelpage', params: { channelname : channelname }})
      },
    },
    components: {
      PostCard: PostCard,
    }
  }
</script>
<style>

</style>

