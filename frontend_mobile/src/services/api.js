import axios from 'axios';
import {ip_address} from './ip.json'

const api = axios.create({
    baseURL: `http://${ip_address}:3333`,
});


export default api;