import axios from 'axios';

const api = axios.create({
    baseURL: 'http://85f5a7aa952c.ngrok.io/',
});

export default api;
