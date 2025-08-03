import axios from 'axios';
import {userAPI } from '../data/variables';
import {useAppSelector} from '../store/hooks';

export const axiosInstanceUser = axios.create({
    baseURL: userAPI,
});

axiosInstanceUser.interceptors.request.use((config) => {
    const { key } = useAppSelector((state) => state.apiKey);

    if (key) {
        config.headers['x-api-key'] = key;
    }

    return config;
});

