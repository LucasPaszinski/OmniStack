import axios from 'axios';

const api = axios.create({
    base_url : 'http://localhost:3333',
});

export default api;