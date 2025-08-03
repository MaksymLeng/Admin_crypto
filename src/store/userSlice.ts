import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type {UserType} from "../Types/Types.tsx"; // Это тип с бэка
import type {TelegramUser} from "../Types/Interface.tsx"; // Это тип Telegram WebApp
import type {UserState} from "../Types/Interface.tsx"
import {userAPI} from "../data/variables.ts";
import {axiosInstanceUser} from "../FetchHelper/axiosInstance.ts";


const initialState: UserState = {
    telegramUser: null,
    userData: null,
    walletFriendly: '',
};

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (telegramUser: TelegramUser) => {
        const res = await axiosInstanceUser.get<UserType>(`${userAPI}/api/user`, {
            params: {
                id: telegramUser.id,
                username: telegramUser.username,
            },
        });
        return res.data;
    }
);

export const updateWallet = createAsyncThunk(
    'user/updateWallet',
    async ({ id, address }: { id: number, address: string }) => {
        const response = await axiosInstanceUser.post(`${userAPI}/api/user/setWallet`, {
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
        clearWallet: (state) => {
            state.walletFriendly = "";
        }
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

export const { setTelegramUser,clearWallet } = userSlice.actions;
export default userSlice.reducer;
