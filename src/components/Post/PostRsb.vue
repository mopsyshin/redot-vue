<template>
  <div class="post-rsb-container rsb-comment-type">
      <div class="comment-list-wrapper">
        <div class="header">
          Comments ({{ commentList.length }})
        </div>
        <div class="comment-list">
          <CommentItem class="comment-list-item" 
          v-for="comment in commentList" 
          :key="comment.comment_id" 
          :content="comment"/>
        </div>
      </div>
      <div class="comment-rsb-footer">
        <div class="comment-input-wrapper">
          <input type="text" placeholder="댓글을 입력해주세요" v-model="commentContent" @keydown.enter="submitComment"/>
          <img src="@/assets/icn-photo.svg" alt="">
        </div>
        <div class="bar"></div>
      </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
import moment from 'moment'
import CommentItem from './CommentItem'

export default {
  data() {
    return {
      commentContent: '',
      commentList: [],
    }
  },
  computed: {
    user_name() {
      return this.$store.getters.nickname
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      var post_id = this.$route.params.id;
      var comment_id = 'comment' + post_id
      var postRef = db.collection(comment_id);
        postRef.onSnapshot((snapshot) => {
          this.commentList = [];
          snapshot.forEach((doc) => {
            this.commentList.push({
                'comment_id'		: doc.data().comment_id,
                'comment_post_id'	: doc.data().comment_post_id,
                'comment_user_name'		: doc.data().comment_user_name,
                'comment_body'	: doc.data().comment_body,
                'comment_like' : doc.data().comment_like,
                'comment_dislike' : doc.data().comment_dislike,
                'comment_created_date'	: doc.data().comment_created_date,
            })
          })
        }, (error) => {
          console.log('Error getting documents', err);
        });
    },
    submitComment() {
      var post_id = this.$route.params.id;
      var comment_id = 'comment' + post_id
      var ref = db.collection(comment_id).doc()
      ref.set({
        comment_id: ref.id,
        comment_post_id: post_id,
        comment_user_name: this.user_name,
        comment_body: this.commentContent,
        comment_like: 0,
        comment_dislike: 0,
        comment_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
      }).then(() => {
        this.commentContent = ''
      })
    }

  },
  components: {
    CommentItem: CommentItem,
  }
}
</script>

<style>

</style>
