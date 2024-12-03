const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    testHistory: [
        {
          date: { type: Date, default: Date.now },
          score: { type: Number, required: true },
          incorrectAnswers: [String], // Array to store incorrect answers
        },
      ],
});

module.exports = mongoose.model('User', userSchema);
