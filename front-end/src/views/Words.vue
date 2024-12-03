<template>
  <div>
    <h1>Words</h1>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th><i class="us flag"></i> English</th>
          <th><i class="de flag"></i> German</th>
          <th><i class="fr flag"></i> French</th>
          <th colspan="3"></th>
        </tr>
      </thead>
      <tr v-for="(word, i) in words" :key="i">
        <td>{{ word.english }}</td>
        <td>{{ word.german }}</td>
        <td>{{ word.french }}</td>
        <td width="75" class="center aligned">
        <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link></td>
        <td width="75" class="center aligned" v-if="isAuthenticated">
        <router-link :to="{ name: 'edit', params: {id: word._id }}">Edit</router-link></td>
        <td width="75" class="center aligned" v-if="isAuthenticated" @click.prevent="onDestroy(word._id)">
        <a :href="`/words/${word._id}`">Destroy</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'words',
  data() {
    return {
      words: [],
      isAuthenticated: !!localStorage.getItem('token'), // Check if token exists
    };
  },
  methods: {
    async onDestroy(id) {
        const sure = window.confirm('Are you sure?');
        if (!sure) return;
        await api.deleteWord(id);
        this.flash('Word deleted sucessfully!', 'success');
        const newWords = this.words.filter(word => word._id !== id);
        this.words = newWords;
    }
  },
  async mounted() {
    this.words = await api.getWords();
  }
};
</script>