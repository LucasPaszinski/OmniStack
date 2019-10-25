import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.16.123:3333',
});

export default api;