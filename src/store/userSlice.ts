import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type {UserType} from "../Types/Types.tsx"; // Это тип с бэка
import type {TelegramUser} from "../Types/Interface.tsx"; // Это тип Telegram WebApp
import type {UserState} from "../Types/Interface.tsx"
import {userAPI} from "../data/variables.ts";
import axios from 'axios';

const initialState: UserState = {
    telegramUser: null,
    userData: null,
    walletFriendly: '',
    walletRaw: '',
    balanceTon: 0,
    loading: false,
    error: null,
};

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async ({telegramUser, apiKey} : {telegramUser: TelegramUser, apiKey: string }) => {
        const res = await axios<UserType>({
            url: `${userAPI}/api/user`,
            params: {
                id: telegramUser.id,
                username: telegramUser.username,
            },
            headers: {
                'x-api-key': apiKey,
            }
        })
        return res.data;
    }
);

export const updateWallet = createAsyncThunk(
    'user/updateWallet',
    async ({ id, address, apiKey }: { id: number, address: string, apiKey: string}) => {
        const response = await axios({
            url: `${userAPI}/api/user/setWallet`,
            method: 'POST',
            data: {
                id,
                address
            },
            headers: {
                'x-api-key': apiKey,
            }
        })
        return response.data;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setTelegramUser(state, action: PayloadAction<TelegramUser>) {
            state.telegramUser = action.payload;
        },
        clearWallet: (state) => {
            state.walletFriendly = "";
            state.loading = false;
            state.error = null;
        },
        setTonBalance: (state, action) => {
            state.balanceTon = action.payload;
        },
        setWalletRaw(state, action: PayloadAction<string>) {
            state.walletRaw = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserType>) => {
                state.userData = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateWallet.fulfilled, (state, action) => {
                state.walletFriendly = action.payload.friendly;
            });

    },
});

export const { setTelegramUser,clearWallet, setTonBalance, setWalletRaw } = userSlice.actions;
export default userSlice.reducer;
