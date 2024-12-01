import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import AboutMe from './views/AboutMe.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/words'
    },
    {
      path: '/words',
      name: 'words',
      component: Words
    },
    {
        path: '/words/new',
        name: 'new-word',
        component: New
    },
    {
        path: '/words/:id',
        name: 'show',
        component: Show
    },
    {
        path: '/words/:id/edit',
        name: 'edit',
        component: Edit
    },
    {
        path: '/test',
        name: 'test',
        component: Test
    },
    {
        path: '/Tran_Hoang_Vu_TV6950k',
        name: 'about-me',
        component: AboutMe
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
  ]
});