<template>
    <div class="container-post-item" @click="toPost(post.id)">
        <p class="channel" :style="{color : post.color}">{{ post.channel }}</p>
        <h3 class="title">
            {{ post.title }}
            <span class="comment-count">{{ post.comment_count }}</span>
        </h3>
        <div class="image">
            <img :src="post.cover_image" alt="" v-show="!post.cover_image == ''">
        </div>
        <p class="author">by
            <b>{{ post.author }}</b>
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
            var date = moment(this.post.date).calendar()
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
