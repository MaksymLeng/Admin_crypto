import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {userAPI} from "../data/variables.ts";

export const fetchApiKey = createAsyncThunk(
    'apiKey/fetch',
    async (userId: string) => {
        const response = await axios.post(
            `${userAPI}/bot/get-api-key`,
            {userId});
        return response.data.apiKey;
    }
);

type ApiKeyState = {
    key: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: ApiKeyState = {
    key: null,
    loading: false,
    error: null,
};

const apiKeySlice = createSlice({
    name: 'apiKey',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiKey.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApiKey.fulfilled, (state, action) => {
                state.key = action.payload;
                state.loading = false;
            })
            .addCase(fetchApiKey.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось получить API ключ';
                state.key = null;
            });
    },
});

export default apiKeySlice.reducer;
