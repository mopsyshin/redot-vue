<template>
    <div class="channel-rsb">
        <div class="rsb-section">
            <div class="section-title">
            Number of Channels
            </div>
            <div class="section-display-number">
            {{ channels.length }}
            </div>
        </div>
        <div class="rsb-section">
            <button class="section-button" @click="toRouter('addChannel')">
                채널 생성하기 +
            </button>
            <div class="section-desc">
                채널을 생성해서 자신만의 커뮤니티를 가꿔보세요!
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        channels() {
            return this.$store.state.channels
        }
    },
}
</script>

<style>

</style>
