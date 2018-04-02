<template>
  <div class="home" :class="{'leave-container':leaveContainer}">
    <transition name="banneraction" appear>
    <div class="home-banner" v-if="!loginState">
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
    <div class="container-fullsize">
      <div class="top-channel-list">
        <div class="channel-list-item" v-for="channel in channels" :key="channel.channel_name">
          {{ channel.channel_name }}
        </div>
      </div>  
      <ul class="reptileList">
          <div v-masonry transition-duration="0.3s"
              item-selector=".post-list-item">
        <li class="post-list-item upload-card" @click="toRouter('upload')">
          @게임<br/>
          채널에<br/>
          글 하나<br/>
          써 볼래요?
        </li>
        <li v-for="post in posts" 
            :key="post.id"
            v-masonry-tile 
            class="post-list-item"
            column-width="#post-list-item"
            @click="toPost(post.id)"
            >
          <div class="container-post-item">
            <p class="channel">{{ post.channel }}</p>
            <h3 class="title">
              {{ post.title }}
              <span class="comment-count">{{ post.comment_count }}</span>
            </h3>
            <div class="image" v-if="image">
              <img :src="post.cover_image" alt="">
            </div>
            <p class="author">by <b>{{ post.author }}</b></p>
            <div class="footer">
              <div class="date">{{ post.date }}</div>
              <div></div>
            </div>
          </div>
        </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase';
import _ from 'lodash';

var next

export default {
    name: 'Home',
    data() {
      return {
        posts: [],
        channels: [],
        leaveContainer: false,
        next: {},
        loginState: true,
        image: false,
      }
    },
    watch: {
    },
    created() {
      this.getPosts();
      this.getChannels();
      document.addEventListener('scroll', this.onScroll );
      window.addEventListener('resize', this.$redrawVueMasonry() );
    },
    mounted() {
      this.$bus.$on('loginState', this.getLoginState)
    },
    beforeDestroy() {
      document.removeEventListener('scroll', this.onScroll, false);
    },
    methods: {
      getLoginState( state ) {
        this.loginState = state
      },
      getPosts() {
        var first = db.collection('posts').orderBy("date", "desc").limit(20)
        first.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.posts.push(doc.data());
          });
        });
          return first.get().then(querySnapshot => {
          var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
          this.next = db.collection("posts")
                  .orderBy("date", "desc")
                  .startAfter(lastVisible)
                  .limit(20);
        });
      },
      getChannels() {
        db.collection('channel').orderBy("channel_created_date").limit(10)
        .get().then( querySnapshot => {
          querySnapshot.forEach(doc => {
            this.channels.push(doc.data());
          })
        })
      },
      loadmore: function() {
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

      toPost(postId) {
        this.leaveContainer = true
        // Prevent masonry layout breaking
        this.$nextTick(() => {
          this.$router.push({ name: 'post', params: { id: postId }})
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
      toRouter( routeName ) {
        this.$router.push({name:routeName})
      },
      toggleLoginModal() {
         this.$bus.$emit('toggleLoginModal', true)
      },
    }
  }
</script>
<style>

</style>

