<template>
    <div class="login">
      <h1 class="mb-4">Login</h1>

      <form @submit.prevent="login">
        <div class="form-group mb-3">
          <label for="username">Username</label>
          <input
          id="username"
          type="text"
          class="form-control"
          v-model="username"
          placeholder="Enter your username"
          required
        />
        </div>
        
        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input
          id="password"
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Enter your password"
          required
          />
        </div>
        
        <button type="submit" class="btn btn-primary" mb-3>Login</button>
      </form>
      <p v-if="message" :class="statusClass" class="mt-3">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';
  import { EventBus } from '../shared/eventBus'; // Adjust the path as needed

  export default {
    data() {
      return {
        username: '', // Input for username
        password: '', // Input for password
        message: '',  // Feedback message
        statusClass: '' // CSS class for feedback ('success' or 'error')
      };
    },
    methods: {
      async login() {
        const userData = { username: this.username, password: this.password };
        try {
          const response = await api.loginUser(userData); // Call the API helper
          this.message = response.message; // Set success message
          this.statusClass = 'success';

          // Store the token in localStorage
          localStorage.setItem("token", response.token);
          EventBus.$emit('authChange', true); // Emit authentication change event
          EventBus.$emit('usernameUpdated', response.user.username);

          // Redirect user to the dashboard or words list
          this.$router.push("/words");

        } catch (error) {
          console.log(error);
          this.message = error.response?.data?.message || 'Login failed.';
          this.statusClass = 'error';

        }
      }
    }
  };
  </script>
  
  <style>
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  </style>
  