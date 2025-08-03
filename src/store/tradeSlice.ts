import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {Trade} from '../Types/Types';
import {userAPI} from "../data/variables.ts";
import axios from 'axios';
import type {TradeState} from "../Types/Interface.tsx";

export const fetchTrades = createAsyncThunk('trades/fetch', async (apiKey : string) => {
    const res = await axios.get<Trade[]>(`${userAPI}/trade/trades`, {
        headers: {
            "x-api-key": apiKey,
        },
    });
    return res.data;
});

const initialState: TradeState = {
    data: [],
    loading: false,
};

export const tradeSlice = createSlice({
    name: 'trades',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrades.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrades.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchTrades.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default tradeSlice.reducer;
