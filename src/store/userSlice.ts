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
    balanceTon: 0,
};

// export const fetchUserData = createAsyncThunk(
//     "user/fetchUserData",
//     async ({telegramUser, apiKey} : {telegramUser: TelegramUser, apiKey: string }) => {
//         const res = await axios.get<UserType>(`${userAPI}/api/user`, {
//             params: {
//                 id: telegramUser.id,
//                 username: telegramUser.username,
//             },
//             headers: {
//                 'x-api-key': apiKey,
//             },
//         });
//         return res.data;
//     }
// );

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async ({telegramUser, apiKey} : {telegramUser: TelegramUser, apiKey: string }) => {
        const res = await axios<UserType>({
            url: `${userAPI}/api/user`,
            method: "GET",
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



// export const updateWallet = createAsyncThunk(
//     'user/updateWallet',
//     async ({ id, address, apiKey }: { id: number, address: string, apiKey: string}) => {
//         const response = await axios.post(`${userAPI}/api/user/setWallet`, {
//             id,
//             address
//         },{
//             headers: {
//                 'x-api-key': apiKey,
//             },
//         });
//         return response.data;
//     }
// );

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
        },
        setTonBalance: (state, action) => {
            state.balanceTon = action.payload;
        },
        clearTonBalance: (state) => {
            state.balanceTon = 0;
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

export const { setTelegramUser,clearWallet, setTonBalance, clearTonBalance } = userSlice.actions;
export default userSlice.reducer;
