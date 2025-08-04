import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {botAPI} from "../data/variables.ts";

export const fetchApiKey = createAsyncThunk(
    'apiKey/fetch',
    async (userId: string) => {
        const response = await axios({
            url:`${botAPI}/api/get-api-key`,
            method: 'POST',
            data: {
                userId
            }
        });
        return response.data.apiKey;
    }
);

const apiKeySlice = createSlice({
    name: 'apiKey',
    initialState: {
        key: '',
        loading: false,
        error: null as string | null,
    },
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
            });
    },
});

export default apiKeySlice.reducer;
