import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { userAPI } from '../../data/variables.ts';
import store from '../../store/index.ts';

export const api = axios.create({ baseURL: userAPI });

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const key = store.getState().apiKey.key;
    if (key) {
        // Превращаем любые заголовки в типизированный AxiosHeaders
        const headers = AxiosHeaders.from(config.headers);
        headers.set('x-api-key', key);      // без any
        config.headers = headers;           // возвращаем обратно
    }
    return config;
});