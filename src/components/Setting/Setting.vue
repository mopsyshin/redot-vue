<template>
  <div class="setting">
    New post
    <input type="text"
        v-model="title"
        @keyup.enter="addPost">
    <input type="text"
          v-model="author">
    <textarea v-model="body" name="" id="" cols="30" rows="10">

    </textarea>
    <button  @click="addPost">
        Add Post
    </button>
  </div>
</template>

<script>
import { db } from '../../firebase';

export default {
  name: 'NewPost',
  data() {
    return {
      title: '',
      body: '',
      author: '',
    }
  },
  methods: {
    addPost() {
      this.$firestore.posts.add(
        {
          title: this.title,
          timestamp: new Date()
        }
      ).then(() => {
        this.$router.push({ name: 'Home'})
      }).catch( error => {
        alert('error')
      })
    },
  }
}
</script>
<style>

</style>

