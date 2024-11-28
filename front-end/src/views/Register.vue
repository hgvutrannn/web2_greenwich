<template>
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input
          type="text"
          v-model="username"
          placeholder="Enter username"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Enter password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p v-if="message" :class="statusClass">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { api } from '../helpers/helpers';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        message: '',
        statusClass: '' // 'success' or 'error'
      };
    },
    methods: {
      // async register() {
      //   try {
      //     const userData = {
      //       username: this.username,
      //       password: this.password
      //     };
      //     const response = await api.registerUser(userData); // Use the helper function
      //     console.log('Response:', response);
      //     this.message = response.message; // Display success message
      //     this.statusClass = 'success';
      //   } catch (errorMessage) {
      //     console.log('Error:', error);
      //     this.message = errorMessage; // Display error message
      //     this.statusClass = 'error';
      //   }
      // }
      async register() {
        console.log('Register method called'); // Debugging
        const userData = { username: this.username, password: this.password };
        try {
            const response = await api.registerUser(userData);
            console.log('Response:', response); // Debugging
            this.message = response.message;
            this.statusClass = 'success';
        } catch (error) {
            console.log('Error:', error); // Debugging
            this.message = error.response?.data?.message || 'Registration failed.';
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
  