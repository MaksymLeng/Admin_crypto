import axios from 'axios';
import { userAPI } from '../../data/variables.ts';
import store from '../../store/index.ts';

export const api = axios.create({ baseURL: userAPI });

// Добавляем ключ автоматически
api.interceptors.request.use((config) => {
    const key: string | null = store.getState().apiKey.key;
    if (key) {
        config.headers = config.headers ?? {};
        (config.headers as any)['x-api-key'] = key;
    }
    return config;
});
