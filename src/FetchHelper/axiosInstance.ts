import axios from 'axios';
import {userAPI } from '../data/variables';
import store from '../store'

export const axiosInstanceUser = axios.create({
    baseURL: userAPI,
});

axiosInstanceUser.interceptors.request.use((config) => {
    const state = store.getState();
    const apiKey = state.apiKey?.key;

    if (apiKey) {
        config.headers['x-api-key'] = apiKey;
    }

    return config;
});

