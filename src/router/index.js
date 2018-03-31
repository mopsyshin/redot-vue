import Vue from 'vue';
import Router from 'vue-router';
import MainContainer from '../components/MainContainer';
import Home from '../components/Home/Home';
import Channel from '../components/Channel/Channel';
import Mypage from '../components/Mypage/Mypage';
import Post from '../components/Post/Post';
import Setting from '../components/Setting/Setting';
import Signup from '../components/Signup/Signup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainContainer,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
        },
        {
          path: '/channel',
          component: Channel,
        },
        {
          path: '/mypage/:username',
          props: true,
          component: Mypage,
        },
        {
          path: '/post/:postid',
          props: true,
          component: Post,
        },
        {
          path: '/setting',
          component: Setting,
        },
        {
          path: '/signup',
          components: Signup,
        }
      ]
    },
   
  ],
});
