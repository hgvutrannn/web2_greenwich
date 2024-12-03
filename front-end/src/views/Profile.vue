<template>
  <div class="ui container">
    <h1>Profile Management</h1>
    <form class="ui form" @submit.prevent="updateProfile">
      <div class="field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="field">
        <label for="password">New Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" class="ui button primary">Save Changes</button>
    </form>
    <p v-if="message" :class="['ui', messageType, 'message']">{{ message }}</p>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'; // Use your existing API setup
import { EventBus } from '../shared/eventBus'; // Import EventBus


export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      messageType: '',
    };
  },
  async created() {
    try {
      const data = await api.getProfile(); // Fetch user profile
      this.username = data.username
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  },
  methods: {
    async updateProfile() {
      try {
        const payload = {
          username: this.username,
          ...(this.password && { password: this.password }), // Include password only if changed
        };
        console.log(payload);
        await api.updateProfile(payload); // Update the profile

        // Emit an event to notify other components of the username change
        EventBus.$emit('usernameUpdated', payload.username);

        this.message = 'Profile updated successfully!';
        this.messageType = 'positive';
      } catch (error) {
        this.message = 'Failed to update profile. Please try again.';
        this.messageType = 'negative';
        console.error('Update failed:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.message {
  margin-top: 20px;
}
</style>