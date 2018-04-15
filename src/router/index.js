import Vue from 'vue';
import Router from 'vue-router';
import MainContainer from '../components/MainContainer';
import Home from '../components/Home/Home';
import HomeRsb from '../components/Home/HomeRsb';
import Channel from '../components/Channel/Channel';
import ChannelRsb from '../components/Channel/ChannelRsb';
import AddChannel from '../components/Channel/AddChannel';
import Mypage from '../components/Mypage/Mypage';
import Post from '../components/Post/Post';
import Setting from '../components/Setting/Setting';
import Store from '../components/Store/Store';
import Upload from '../components/Upload/Upload';
import Signup from '../components/Signup/Signup';
import Terms from '../components/Signup/Terms';
import Register from '../components/Signup/Register';


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
          name: 'home',
          components: {
            mv: Home,
            rsb: HomeRsb
          },
        },
        {
          path: '/channel',
          name: 'channel',
          components: {
            mv: Channel,
            rsb: ChannelRsb,
          },
        },
        {
          path: '/mypage/:author',
          name: 'mypage',
          props: true,
          components: {
            mv: Mypage,
            rsb: HomeRsb
          },
        },
        {
          path: '/post/:id',
          name: 'post',
          props: true,
          components: {
            mv: Post,
            rsb: HomeRsb
          },
        },
        {
          path: '/setting',
          name: 'setting',
          components: {
            mv: Setting,
            rsb: HomeRsb
          },
        },
        {
          path: '/store',
          name: 'store',
          components: {
            mv: Store,
            rsb: HomeRsb
          },
        },
      ],
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      children: [
        {
          path: '/signup/terms',
          name: 'terms',
          component: Terms,
        },
        {
          path: '/signup/register',
          name: 'register',
          component: Register,
        }
      ],
    },
    {
      path: '/addChannel',
      name: 'addChannel',
      component: AddChannel,
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
    
  }
});
