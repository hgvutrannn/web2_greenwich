<template>
  <div>
    <h1>Edit Word</h1>
    <word-form @createOrUpdate="createOrUpdate" :word="this.word"></word-form>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'word-form': WordForm
  },
  data: function() {
    return {
      word: {},
      origianlWord: {}
    };
  },
  async mounted() {
    const fetchedWord = await api.getWord(this.$route.params.id);
    this.word = fetchedWord; // Bind fetched word to the form
    this.originalWord = { ...fetchedWord }; // Store the original data for comparison
  },
  methods: {
    async createOrUpdate(word) {
      // Compare the current word with the original word
      if (
        word.english === this.originalWord.english &&
        word.german === this.originalWord.german &&
        word.french === this.originalWord.french
      ) {
        this.flash('No changes detected.', 'info'); // Provide feedback to the user
        return; // Exit if no changes
      }

      // Proceed with the update if changes are detected
      try {
        await api.updateWord(word); // API call to update the word
        this.flash('Word updated successfully!', 'success');
        this.$router.push(`/words/${word._id}`); // Redirect to the word's detail page
      } catch (error) {
        console.error('Failed to update word:', error);
        this.flash('Failed to update word. Please try again.', 'error');
      }
    }
  }
};
</script>