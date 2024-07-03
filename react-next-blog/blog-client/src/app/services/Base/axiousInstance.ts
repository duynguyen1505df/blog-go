import port from './http';
import axios, {AxiosInstance} from 'axios';

const https: AxiosInstance = axios.create({
    baseURL: port.http,
    timeout: 10000,
    headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer token`,
    },
});

export default https;
