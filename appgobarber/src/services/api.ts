import axios from 'axios';

const api = axios.create({
    baseURL: 'http://de8688e4b9a6.ngrok.io',
});

export default api;
