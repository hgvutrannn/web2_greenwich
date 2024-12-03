<template>
  <div class="register">
    <h1 class="mb-4">Register</h1> 
    <form @submit.prevent="register">
      <div class="form-group mb-3"> 
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          class="form-control"
          v-model="username"
          placeholder="Enter username"
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
          placeholder="Enter password"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary mb-3">Register</button>
    </form>

    <p v-if="message" :class="statusClass" class="mt-3">{{ message }}</p> 
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
  