<template>
  <div class="container-768 add-channel-container">
        <div class="page-header">
            <div class="title">채널 생성하기</div>
            <div class="desc">채널을 생성하고, 당신만의 커뮤니티를 키워보세요!</div>
        </div>
        <hr>
        <div class="page-contents">
            <div class="channel-preview" :style="{ backgroundColor : selectedColor }">#{{ channelName }}</div>
            <div class="common-input-area">
                <div class="input-rabel">채널명</div>
                <div class="input-text">
                <input type="text" placeholder="채널명을 입력해주세요" v-model="channelName">
                <div class="msg-err">*최대 8자까지 작성할 수 있습니다.</div>
                </div>
            </div>
            <div class="common-input-area">
                <div class="input-rabel">채널 소개</div>
                <div class="input-text">
                <textarea cols="40" rows="5" v-model="channelDesc" placeholder="간단한 채널 소개를 작성해주세요"></textarea>
                <div class="msg-err">*최대 120자까지 작성할 수 있습니다..</div>
                </div>
            </div>
            <div class="common-input-area">
                <div class="input-rabel">채널 대표색상 선택</div>
                <div class="wrapper-color-select">
                    <div class="color-item" 
                    v-for=" (color, index) in colors" 
                    :key="index" 
                    :color="color"
                    :style="{ backgroundColor : color }"
                    @click="selectColor(color, index)"
                    :class="{ selected : selectedColor == color }"
                    ></div>
                </div>
            </div>
        </div>
        <div class="bottom-right-button-group">
            <button class="btn-negative" @click="back">취소</button>
            <button class="btn-positive" @click="addChannel">생성하기</button>
        </div>
  </div>
</template>

<script>
import ChannelColorItem from './ChannelColorItem'
import { db, auth } from '../../firebase';
import moment from 'moment';

  export default {
    data() {
        return {
            colors: [
                '#ff0000','#ff7676','#ff749f','#ff74ba','#ff74d0',
                '#ff74f0','#ff74ff','#c674ff','#af74ff','#9d74ff',
                '#8874ff','#7674ff','#7487ff','#74a2ff','#74baff',
                '#74cbff','#74deff','#40f1ff','#40fff3','#40ffda',
                '#40ffc4','#40ffa1','#40ff88','#40ff6c','#79ff00',
                '#a3ff40','#c2ff40','#e6f14a','#f8e127','#f5d12d',
                '#f5be2d','#f5b02d','#f5a12d','#ff8600','#ff6d00',
                '#ff3f00','#b00000','#c35555','#af526f','#ad4d7d',
                '#ae4f8e','#ad4ca2','#954fac','#8952b0','#6f49a4',
                '#654aa5','#5648a6','#4d4ca9','#4a57a9','#4967a5',
                '#47719a','#4a7f9f','#4a90a6','#289aa3','#29a59d',
                '#2aaa91','#2aa780','#28a667','#28a758','#2ba647',
                '#52ac00','#68a428','#7fa829','#9ca433','#ac9c1d',
                '#ac9220','#a17d1d','#a1731d','#a56c1d','#a15500',
                '#a74700','#992600','#000000','#282828','#494949',
                '#6b6b6b','#8b8b8b',
            ],
            selectedColor: '#ff0000',
            channelName: '',
            channelDesc: '',
        }
    },
    computed: {
        channelCreator() {
            return this.$store.getters.nickname
        }
    },
    methods: {
        submit() {
            
        },
        selectColor( color, index ) {
            this.selectedColor = color
        },
        addChannel() {
            const ref = db.collection('channel').doc()
                ref.set({
                channel_id : ref.id,
                channel_admin: this.channelCreator,
                channel_name: this.channelName,
                channel_color: this.selectedColor,
                channel_desc: this.channelDesc,
                channel_created_date: moment().format('YYYY-MM-DD, HH:mm:ss'),
                channel_score: 0,
                channel_post_count: 0,
                }).then(() => { 
                    this.toRouter('home')
                    this.$store.dispatch('getChannels')
            })
        },
    },
    components: {
        ChannelColorItem : ChannelColorItem
    },
  }
</script>

<style>

</style>

