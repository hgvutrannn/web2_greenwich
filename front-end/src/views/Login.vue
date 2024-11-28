<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input
          type="text"
          v-model="username"
          placeholder="Enter your username"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p v-if="message" :class="statusClass">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';
  
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
          console.log('Login successful:', response);
          // Save user data or token if needed
          // Example: localStorage.setItem('token', response.token);
        } catch (error) {
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
  