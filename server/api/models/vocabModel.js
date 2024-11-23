const mongoose = require('mongoose');

const Schema = mongoose.Schema; // use the Schema class from the Mongoose library

const VocabSchema = new Schema( // create a new instance of the Schema class that has 2 attributes (englinsh and german)
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            required: 'German word cannot be blank'
        },
        french: { // Add the third language
            type: String,
            required: 'French word cannot be blank'
        }
    },
    { collection: 'vocab3' }
);

module.exports = mongoose.model('Vocab', VocabSchema); // solidify this Schema as a data model with mongoose and export it from this file for use in other areas