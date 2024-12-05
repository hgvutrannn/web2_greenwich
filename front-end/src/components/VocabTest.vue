<template>
  <div>
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit">
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord.german" />
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="france flag"></i> French
        </div>
        <input type="text" placeholder="Enter word..." v-model="french" :disabled="testOver" autocomplete="off" />
      </div>


      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [...this.words.sort(() => 0.5 - Math.random())],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      english: '',
      french: '',
      score: 0,
      testOver: false
    };
  },
  computed: {
    currWord: function () {
      return this.randWords.length ? this.randWords[0] : '';
    }
  },
  methods: {
    onSubmit: function () {
      let isCorrectEnglish = this.english === this.currWord.english;
      let isCorrectFrench = this.french === this.currWord.french;

      if (isCorrectEnglish && isCorrectFrench) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
      }

      // Log incorrect guesses for English or French
      if (!isCorrectEnglish || !isCorrectFrench) {
        this.incorrectGuesses.push(`${this.currWord.german} - ${this.currWord.english} - ${this.currWord.french}`);
      }

      // Reset inputs
      this.english = '';
      this.french = '';
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
        this.saveTestResult();
      }
    },
    displayResults: function () {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join('<br>');
        this.result = `<strong>You got the following words wrong:</strong><br>${incorrect}`;
        this.resultClass = 'error';
      }
    },
    async saveTestResult() {
      try {
        const payload = {
          score: this.score,
          incorrectAnswers: this.incorrectGuesses,
        };
        console.log(payload)
        await api.saveTestResult(payload); // API call to save test results
        this.flash('Test result saved successfully.', 'success', { timeout: 3000 });
      } catch (error) {
        console.error('Failed to save test result:', error);
        this.flash('Failed to save test result.', 'error', { timeout: 3000 });
      }
    },
  }
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>