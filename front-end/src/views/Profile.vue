<template>
  <div class="container mt-5">
    <h1 class="mb-4">Profile Management</h1>
    
    <form class="mb-4" @submit.prevent="updateProfile">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          id="username"
          class="form-control"
          v-model="profile.username"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">New Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>

    <p v-if="message" :class="['alert', messageType === 'positive' ? 'alert-success' : 'alert-danger']">
      {{ message }}
    </p>
    
    <!-- Total Score Section -->
    <div class="alert alert-info" role="alert">
      <strong>Total Score:</strong> {{ totalScore }}
    </div>

    <h2 class="mb-4">Test History</h2>
    <div v-if="profile.testHistory.length">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Score</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="test in profile.testHistory" :key="test.date">
            <td>{{ new Date(test.date).toLocaleString() }}</td>
            <td>{{ test.score }}</td>
            <td>
              <ul>
                <li v-for="error in test.incorrectAnswers" :key="error">{{ error }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No test history available.</p>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'; // Use your existing API setup
import { EventBus } from '../shared/eventBus'; // Import EventBus

export default {
  data() {
    return {
      profile: {
        username: '',
        testHistory: [], // Initialize as empty array to prevent errors
      },
      originalUsername: '',
      password: '',
      message: '',
      messageType: '',
      totalScore: 0,
    };
  },
  async created() {
    try {
      const data = await api.getProfile(); // Fetch user profile
      this.profile = data;
      // Sort test history by date in descending order
      this.profile.testHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Calculate total score
      this.totalScore = this.profile.testHistory.reduce((acc, test) => acc + test.score, 0);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  },
  methods: {
    async updateProfile() {
      try {
        if (!this.profile.username || this.profile.username.trim() === '') {
          this.message = 'Username cannot be empty.';
          this.messageType = 'negative';
          return;
        }
        const payload = {
          username: this.profile.username, // Use updated username
          ...(this.password && { password: this.password }), // Include password only if changed
        };

        const updatedProfile = await api.updateProfile(payload); // Update the profile
        this.profile = updatedProfile; // Update the local profile object

        // Emit an event to notify other components of the username change
        EventBus.$emit('authChange', true, payload.username);

        this.message = 'Profile updated successfully!';
        this.messageType = 'positive';
      } catch (error) {
        // Check if backend provided an error message
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message; // Use backend error message
        } else {
          this.message = 'Failed to update profile. Please try again.'; // Fallback message
        }
        this.messageType = 'negative';
        console.error('Update failed:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.alert {
  margin-top: 20px;
}

.table {
  margin-top: 20px;
}
</style>
