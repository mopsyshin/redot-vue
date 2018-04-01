<template>
  <div class="container-768 post">
    <div class="title">{{ title }}</div>
    <div class="body">{{ body }}</div>
    <div class="author">{{ author }}</div>
    <div class="date">{{ date }}</div>
    <button class="btn-delete"></button>
  </div>
</template>

<script>
import { db } from '../../firebase';

  export default {
    data() {
      return {
        contents: [],
        title: '',
        body: '',
        author: '',
        date: '',
      }
    },
    created() {
      this.getContents()
    },
    methods: {
      getContents() {
        var post_id = this.$route.params.id;
        var docRef = db.collection('posts').doc(post_id)
        docRef.get().then((doc) =>{
          this.contents.push(doc.data());
        }).then( () => {
          this.title = this.contents[0].title
          this.body = this.contents[0].body
          this.author = this.contents[0].author
          this.date = this.contents[0].date
        })
      },
    }
  }
</script>
<style>

</style>

