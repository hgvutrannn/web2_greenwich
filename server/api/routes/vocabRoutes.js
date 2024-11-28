const vocabBuilder = require('../controllers/vocabController');
const userController = require('../controllers/userController');
module.exports = app => {
    app
        .route('/words')
        .get(vocabBuilder.list_all_words)
        .post(vocabBuilder.create_a_word);
    app
        .route('/words/:wordId')
        .get(vocabBuilder.read_a_word)
        .put(vocabBuilder.update_a_word)
        .delete(vocabBuilder.delete_a_word);

    // Routes for user management
    app
        .route('/register')
        .post(userController.registerUser); // User registration

    app
        .route('/login')
        .post(userController.loginUser); // User login
};