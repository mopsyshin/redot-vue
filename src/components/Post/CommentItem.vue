<template>
  <div class="comment-item-wrapper">
    <div class="comment-header">
        {{ content.comment_user_name }}
        <span class="date">{{ date }}</span>
    </div>
    <div class="comment-body">
        {{ content.comment_body }}
    </div>
    <div class="comment-footer">
        <div class="re-comment">
            댓글달기
        </div>
        <div class="like-func">
            <img src="@/assets/icn-up.svg" alt="">
            {{ content.comment_like }}
            <img src="@/assets/icn-down.svg" alt="">
            {{ content.comment_dislike }}
        </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['content'],
    computed: {
        date() {
            var date = moment(this.content.comment_created_date).calendar()
            return date
        }
    }
}
</script>

<style>

</style>
