const vocabBuilder = require('../controllers/vocabController');
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth'); // Import the authentication middleware

module.exports = app => {
    app
        .route('/words')
        .get(vocabBuilder.list_all_words)
        .post(authenticate, vocabBuilder.create_a_word);
    app
        .route('/words/:wordId')
        .get(vocabBuilder.read_a_word)
        .put(authenticate, vocabBuilder.update_a_word)
        .delete(authenticate, vocabBuilder.delete_a_word);
    
    // User Profile Routes
    app
        .route('/profile')
        .get(authenticate, userController.getProfile) // Fetch profile
        .put(authenticate, userController.updateProfile) // Update profile
    
    app
        .route('/profile/test-result')
        .post(authenticate, userController.saveTestResult);

    // Routes for user management
    app
        .route('/register')
        .post(userController.registerUser); // User registration

    app
        .route('/login')
        .post(userController.loginUser); // User login

    
};