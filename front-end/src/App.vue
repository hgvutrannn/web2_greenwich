<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" v-if="isAuthenticated" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" v-if="isAuthenticated" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <router-link to="/Tran_Hoang_Vu_TV6950k" class="item">
            <i class="user circle icon"></i> Author
          </router-link>

          <!-- Show Login/Register if not authenticated -->
          <router-link to="/login" v-if="!isAuthenticated" class="item">
            <i class="sign-in icon"></i> Login
          </router-link>
          <router-link to="/register" v-if="!isAuthenticated" class="item">
            <i class="user plus icon"></i> Register
          </router-link>

          <router-link to="/profile" v-if="isAuthenticated" class="item">
            <i class="user icon"></i> {{ username || 'Profile' }}
          </router-link>

          <!-- Show Logout if authenticated -->
          <button v-if="isAuthenticated" @click="logout" class="ui inverted red button">
            <i class="sign-out icon"></i> Logout
          </button>
        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from './helpers/helpers'; // Import the centralized API helper
import { EventBus } from './shared/eventBus';

export default {
  name: 'app',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'), // Initial state
      username: '', // Initialize username
    };
  },
  created() {
    EventBus.$on('authChange', (authenticated) => {
      this.isAuthenticated = authenticated; // Update authentication state
    });
    
    // Listen for username updates
    EventBus.$on('usernameUpdated', (newUsername) => {
      this.username = newUsername; // Update username dynamically
    });
    
    // Fetch username on initial load if already authenticated
    if (this.isAuthenticated) {
      this.fetchUsername();
    }
  },
  methods: {
    async fetchUsername() {
      try {
        const profile = await api.getProfile(); // Fetch profile using API helper
        this.username = profile.username; // Update username dynamically
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    },
    logout() {
      localStorage.removeItem('token'); // Clear the JWT token
      EventBus.$emit('authChange', false); // Emit logout event
      this.$router.push('/login'); // Redirect to login page
    },
  },
};
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}
</style>
