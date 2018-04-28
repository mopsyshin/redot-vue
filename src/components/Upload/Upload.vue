<template>
  <div class="container-768 upload">
    <div class="upload-container">
      <div class="close-wrapper">
        <img src="@/assets/icn-close.svg" alt="" @click="back">
      </div>
      <div class="wrapper-select-channel">
        <Dropdown :items="channel_names" 
                  :placeholder="'채널을 선택해주세요'" 
                  @itemSelected="channelSelected"/>
      </div>
      <div class="wrapper-title">
        <textarea-autosize 
              type="text"
               class="title-input"
               v-model="title"
               placeholder="제목을 입력하세요"
               >
        </textarea-autosize>
      </div>
      <div class="bar"></div>
      <div id="quill-editor"></div>
      <div id="toolbar" class="custom-toolbar">
        <select class="ql-size">
          <option value="small"></option>
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
      </div>
      <div class="bottom-right-button-group">
          <button class="btn-positive" @click="addPost" :disabled="isEmpty">작성완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../firebase'
import moment from 'moment'
import Vue from 'vue'
import Dropdown from '../GlobalModules/Dropdown'
import Quill from 'quill'
import Converter from 'quill-delta-to-html'
import resizebase64 from 'resize-base64';

var Editor;

export default {
  name: 'Upload',
  data() {
    return {
      imageUrl: '',
      title: '',
      selectedChannel: '',
      postContents: '',
      selectedChannelColor: '',
      content: {
        ops: [
          {
            insert: '',
          }
        ],
      }
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
      if ( this.title == '' || this.selectedChannel == '') {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
   Editor = new Quill('#quill-editor', {
      bounds: '#quill-editor',
      modules: {
        toolbar: {
          container: '#toolbar',
        },
      },
      placeholder: '',
      theme: 'snow'
    });
  },
  methods: {
    convertToHtml(delta) {
      for ( var i = 0; i < delta.ops.length; i++) {
        var str = delta.ops[i].insert
        if ( str.image ){
          var beforeImg = str.image
          delta.ops[i].insert.image = resizebase64(str.image, 700, 700)
          var afterImg = delta.ops[i].insert.image
          console.log( beforeImg == afterImg )
        }
      }
      var deltaOps = delta.ops
      var cfg = {}
      var converter = new Converter(deltaOps, cfg)
      var html = converter.convert();
      return html
    },
    channelSelected(chName) {
      this.selectedChannel = chName
      this.channels.forEach( item => {
        if ( chName == item.channel_name ) {
          this.selectedChannelColor = item.channel_color
        }
      })
    },
    addPost() {
      var delta = Editor.getContents();
      var html = this.convertToHtml(delta)

      const ref = db.collection('post').doc()
        ref.set({
          post_id: ref.id,
          post_channel_color: this.selectedChannelColor,
          post_channel_name: this.selectedChannel,
          post_title: this.title,
          post_body: html,
          post_user_name: this.author,
          post_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
          post_like: [],
          post_dislike: [],
          post_deleted: false,
          }).then(() => { 
            var thumbImg = ''
            for ( var i = 0; i < delta.ops.length; i++) {
              var str = delta.ops[i].insert
              if ( str.image ){
                thumbImg = resizebase64(str.image, 300, 300)
                break
              }
            }
            db.collection('post_list_thumb').doc().set({
              post_id: ref.id,
              post_channel_color: this.selectedChannelColor,
              post_channel_name: this.selectedChannel,
              post_title: this.title,
              post_user_name: this.author,
              post_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
              post_like_count: 0,
              post_dislike_count: 0,
              post_deleted: false,
              post_thumb_image: thumbImg,
            }).then(() => {
              this.toRouter('home')
            }).catch(err => {
              console.log(err)
            })
        }).catch( err => {
          console.log(err)
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

