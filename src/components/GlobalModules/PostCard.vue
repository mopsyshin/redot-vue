<template>
    <div class="container-post-item" @click="toPost(post.post_id)">
        <p class="channel" :style="{color : post.post_channel_color}">{{ post.post_channel_name }}</p>
        <h3 class="title">
            {{ post.post_title }}
            <span class="comment-count">{{ post.post_comment_count }}</span>
        </h3>
        <div class="image">
            <img :src="post.post_thumb_image" alt="" v-show="!post.post_thumb_image == ''">
        </div>
        <p class="author">by
            <b>{{ post.post_user_name }}</b>
        </p>
        <div class="footer">
            <div class="date">{{ postDate }}</div>
            <div></div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['post'],
    computed: {
        postDate() {
            var date = moment(this.post.post_created_date).calendar()
            return date
        }
    },
    methods: {
        toPost(postId) {   
            this.$router.push({ name: 'post', params: { id: postId }})
      },
    },
}
</script>

<style scoped>

</style>
