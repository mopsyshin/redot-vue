import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth } from '../firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        
    },
    state: {
        loginState: null,
        user: {},
        channels: [],
        recoCh: '',
        rsbState: true,
        channelReady: false,
    },
    getters: {
        email: state => {
            return state.user.email
        },
        nickname: state => {
            return state.user.displayName
        },
    },
    mutations: {
        setLoginState(state, payload) {
            state.loginState = payload.loginState
        },
        setUser(state, payload) {
            state.user = payload.user
        },
        setChannels(state, payload) {
            state.channels = payload.channels
        },
        setRecoCh(state, payload) {
            state.recoCh = payload.recoCh
        },
        toggleRsb(state) {
            state.rsbState = !state.rsbState
        },
        channelReady(state, payload) {
            state.channelReady = payload.value
        }
    },
    actions: {
        logout() {
            auth.signOut().then(() => {
                store.commit({
                    type: 'setLoginState',
                    loginState: false,
                })
            }).catch(error => {
      
            });
        },
        getUserInfo() {
            auth.onAuthStateChanged( user => {
                if (user) {
                    store.commit({
                        type: 'setUser',
                        user: user,
                    })
                    store.commit({
                        type: 'setLoginState',
                        loginState: true,
                    })
                } else {
                    console.log('error')
                }
            })
        },
        getChannels() {
            store.commit({
                type: 'channelReady',
                value: false,
            })
            var channels = []
            var recoCh = []
            db.collection('channel').orderBy("channel_created_date").limit(8)
            .get().then( querySnapshot => {
              querySnapshot.forEach(doc => {
                channels.push(doc.data())
                recoCh.push(doc.data().channel_name)
              })
            }).then( () => {
                store.commit({
                    type: 'channelReady',
                    value: true,
                })
                store.commit({
                    type: 'setChannels',
                    channels: channels,
                })  
                var leng = recoCh.length
                var random = Math.floor((Math.random() * leng))
                store.commit({
                    type: 'setRecoCh',
                    recoCh: recoCh[random],
                })  
            })
        },
    }
  })

export default store