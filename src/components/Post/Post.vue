<template>
  <div class="container-768 post-container">
    <div class="post-header">
      <div class="left">
        <div class="channel" :style="{color : color}">{{ channel }}</div>
        <div class="title">{{ title }}</div>
      </div>
      <div class="right">
        <div class="author"><span>by </span>{{ author }}</div>
        <div class="date">{{ postDate }}</div>
      </div>
    </div>
    <div class="body" v-html="body"></div>
    
    
    <button class="btn-delete"></button>
  </div>
</template>

<script>
import { db } from '../../firebase';
import moment from 'moment'

  export default {
    data() {
      return {
        contents: [],
        title: '',
        body: '',
        author: '',
        date: '',
        channel: '',
        color: '',
      }
    },
    computed: {
      postDate() {
        var modiDate = moment(this.date).calendar()
        return modiDate
      },
    },
    created() {
      this.getContents()
    },
    methods: {
      getContents() {
        var post_id = this.$route.params.id;
        var docRef = db.collection('post').doc(post_id)
        docRef.get().then((doc) =>{
          this.contents.push(doc.data());
        }).then( () => {
          this.author = this.contents[0].post_user_name
          this.title = this.contents[0].post_title
          this.body = this.contents[0].post_body
          this.channel = this.contents[0].post_channel_name
          this.color = this.contents[0].post_channel_color
          this.date = this.contents[0].post_created_date
        })
      },
    }
  }
</script>
<style>

</style>

