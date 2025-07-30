import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type {UserType} from "../Types/Types.tsx"; // Это тип с бэка
import type {TelegramUser} from "../Types/Interface.tsx"; // Это тип Telegram WebApp
import type {UserState} from "../Types/Interface.tsx"
import axios from 'axios';


const initialState: UserState = {
    telegramUser: null,
    userData: null,
    walletFriendly: '',
};

const API = 'http://localhost:3000';

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (telegramUser: TelegramUser) => {
        const res = await fetch(
            `${API}/api/user?id=${telegramUser.id}&username=${telegramUser.username}`
        );
        const data: UserType = await res.json();
        return data;
    }
);

export const updateWallet = createAsyncThunk(
    'user/updateWallet',
    async ({ id, address }: { id: number, address: string }) => {
        const response = await axios.post(`${API}/api/user/setWallet`, {
            id,
            address
        });
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserType>) => {
            state.userData = action.payload;
        });
        builder.addCase(updateWallet.fulfilled, (state, action) => {
            state.walletFriendly = action.payload.friendly;
        });
    },
});

export const { setTelegramUser } = userSlice.actions;
export default userSlice.reducer;
