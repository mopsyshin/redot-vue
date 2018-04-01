<template>
  <div class="container-768 upload">
    <h1>Upload</h1>
    <div>
      <label for="">title</label>
      <input type="text"
              v-model="title">
    </div>
    <div>
      <label for="">Channel</label>
      <select name="" id="" v-model="selectedChannel">
        <option :value="channel.channel_name" v-for="channel in channels" :key="channel.channel_name">{{ channel.channel_name }}</option>
      </select>
    </div>
    <div>
      <textarea v-model="body" name="" id="" cols="30" rows="10"></textarea>
    </div>
    <button  @click="addPost">
        Add Post
    </button>
  </div>
</template>

<script>
import { db } from '../../firebase';
import { auth } from '../../firebase';

export default {
  name: 'Upload',
  data() {
    return {
      posts: [],
      title: '',
      body: '',
      author: '',
      channels: [],
      selectedChannel: '',
    }
  },
  created() {
    this.getAuth()
    this.getChannels() 
  },
  methods: {
    addPost() {
      const ref = db.collection('posts').doc()
        ref.set({
          id: ref.id,
          channel: this.selectedChannel,
          title: this.title,
          body: this.body,
          author: this.author,
          date: new Date()
          }).then(() => { 
             alert('success')
        })
    },
    getChannels() {
      db.collection('channel').orderBy("channel_created_date").limit(10)
        .get().then( querySnapshot => {
          querySnapshot.forEach(doc => {
            this.channels.push(doc.data());
          })
        })
    },
    getAuth() {
      var user = auth.currentUser
      var email = user.email
      this.author = email
    }
  }
}
</script>
<style>

</style>

