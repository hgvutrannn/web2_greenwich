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
import Profile from './views/Profile.vue';

import VueFlashMessage from 'vue-flash-message';

Vue.use(VueFlashMessage, {
  messageOptions: {
      timeout: 3000,
      pauseOnInteract: true
  }
});

Vue.use(Router);
// Create the flash message instance
const vm = new Vue(); // Ensure this instance is accessible in the router guard

// Define the router instance
const router = new Router({
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
      component: New,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/words/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/words/:id/edit',
      name: 'edit',
      component: Edit,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: { requiresAuth: true } // Protected route
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
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true } // Protected route
    },
  ],
});

// Apply the global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    vm.flash('You need to log in to access this page.', 'error');
    // Redirect to the login page if not authenticated
    next('/login');
  } else {
    // Allow navigation
    next();
  }
});

// Export the router instance
export default router;
