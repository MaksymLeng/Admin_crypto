import axios from 'axios';
import { API } from '../data/variables';
import store from '../store'

const axiosInstance = axios.create({
    baseURL: API,
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const apiKey = state.apiKey?.key;

    if (apiKey) {
        config.headers['x-api-key'] = apiKey;
    }

    return config;
});

export default axiosInstance;
