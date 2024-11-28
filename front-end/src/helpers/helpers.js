import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
const baseURL = 'http://localhost:3000/';

const handleError = fn => (...params) => 
    fn(...params).catch(error => {
        const status = error.response?.status || 'Unknown';
        const statusText = error.response?.statusText || 'Error occurred';

        // Display the server's custom message (if available) or the default message
        const message = error.response?.data?.message || `${status}: ${statusText}`;
        vm.flash(message, 'error');

        // Rethrow the entire error object to let the caller handle it
        throw error;
    });


export const api = {
    getWord: handleError(async id => {
        const res = await axios.get(baseURL + 'words' + id);
        return res.data;
    }),
    getWords: handleError(async () => {
        const res = await axios.get(baseURL + 'words');
        return res.data;
    }),

    deleteWord: handleError(async id => {
        const res = await axios.delete(baseURL + 'words' + id);
        return res.data;
    }),
    createWord: handleError(async payload => {
        const res = await axios.post(baseURL + 'words', payload);
        return res.data;
    }),
    updateWord: handleError(async payload => {
        const res = await axios.put(baseURL + 'words' + payload._id, payload);
        return res.data;
    }),

    // User API functions
    registerUser: handleError(async payload => {
        const res = await axios.post(baseURL + 'register', payload);
        return res.data;
    }),

    loginUser: handleError(async payload => {
        const res = await axios.post(baseURL + 'login', payload);
        return res.data; 
    })

};