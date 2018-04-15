<template>
  <div class="container-768 upload">
    <div class="upload-container">
      <div class="close-wrapper">
        <img src="@/assets/icn-close.svg" alt="" @click="back">
      </div>
      <div class="wrapper-select-channel">
        <Dropdown :items="channel_names" @itemSelected="channelSelected"/>
      </div>
      <div class="wrapper-title">
        <textarea-autosize 
              type="text"
               class="title-input"
               v-model="title"
               placeholder="제목을 입력해주세요"
               >
        </textarea-autosize>
      </div>
      <quill-editor v-model="body"
                    ref="myQuillEditor"
                    :options="editorOption"
                    class="custom-editor">
      </quill-editor>
      <div id="toolbar" class="custom-toolbar">
        <!-- Add buttons as you would before -->
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <select class="ql-align"></select>
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-image"></button>
        <button class="ql-link"></button>
        
        <!-- But you can also add your own -->
      </div>
      <div class="bottom-right-button-group">
          <button class="btn-positive" @click="addPost" :disabled="isEmpty">작성완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../firebase';
import moment from 'moment';
import Vue from 'vue'
import Dropdown from '../GlobalModules/Dropdown'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, {

})

export default {
  name: 'Upload',
  data() {
    return {
      title: '',
      body: '',
      selectedChannel: '',
      selectedChannelColor: '',
      editorOption: {
            // debug: 'info',
            modules: {
              toolbar: '#toolbar'
            },
            placeholder: '본문을 입력해주세요',
            readOnly: true,
            theme: 'snow'
      },
    }
  },
  computed: {
    author() {
      return this.$store.getters.nickname
    },
    channels(){
      return this.$store.state.channels
    },
    channel_names() {
      var newArr = [] 
      this.channels.forEach( item => {
        newArr.push(item.channel_name)
      })
      return newArr
    },
    isEmpty() {
      if ( this.title | this.body == '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    channelSelected(chName) {
      this.selectedChannel = chName
      this.channels.forEach( item => {
        if ( chName == item.channel_name ) {
          this.selectedChannelColor = item.channel_color
        }
      })
    },
    addPost() {
      const ref = db.collection('posts').doc()
        ref.set({
          id: ref.id,
          color: this.selectedChannelColor,
          channel: this.selectedChannel,
          title: this.title,
          body: this.body,
          author: this.author,
          date: moment().format('YYYY-MM-DD, HH:mm:ss'),
          }).then(() => { 
             alert('success')
        })
    },
  },
  components: {
    Dropdown: Dropdown
  }
}
</script>
<style>

</style>

