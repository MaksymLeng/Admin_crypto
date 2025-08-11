import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type {Deposit, UserType} from "../Types/Types.tsx"; // Это тип с бэка
import type {TelegramUser} from "../Types/Interface.tsx"; // Это тип Telegram WebApp
import type {UserState} from "../Types/Interface.tsx"
import {userAPI} from "../data/variables.ts";
import axios from 'axios';

const initialState: UserState = {
    telegramUser: null,
    userData: null,
    walletFriendly: '',
    rawWallet: '',
    balanceTon: 0,
    loading: false,
    error: null,
    depositHistory: [],
    depositLoading: false,
    depositError: null,
    refCandidate: null,
};

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async ({id, username, apiKey} : {id: number, username: string, apiKey: string }) => {
        const res = await axios.get<UserType>(`${userAPI}/api/user`,
            {params: {
                id,
                username,
            },
            headers: {
                'x-api-key': apiKey,
            }}
        )
        return res.data;
    }
);

export const updateWallet = createAsyncThunk(
    'user/updateWallet',
    async ({ id, address, apiKey }: { id: number, address: string, apiKey: string}) => {
        const response = await axios.post(`${userAPI}/api/user/setWallet`,
           { id, address },
            { headers: { 'x-api-key': apiKey } }
        )
        return response.data;
    }
);

export const fetchDepositHistory = createAsyncThunk<
    Deposit[], { userId: number; apiKey: string }>
('user/fetchDepositHistory', async ({ userId, apiKey }) => {
    const { data } = await axios.get(
        `${userAPI}/api/deposit/history/${userId}`,
        { headers: { 'x-api-key': apiKey } }
    );
    return data;
});

export const applyReferral = createAsyncThunk<
    { invitedBy: string },
    { userId: number; ref: string; apiKey: string }
>('user/applyReferral', async ({ userId, ref, apiKey }) => {
    const { data } = await axios.post(
        `${userAPI}/api/user/apply-ref`,
        { userId, ref },
        { headers: { 'x-api-key': apiKey } }
    );
    return { invitedBy: data.invitedBy ?? ref };
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setTelegramUser(state, action: PayloadAction<TelegramUser>) {
            state.telegramUser = action.payload;
        },
        clearWallet: (state) => {
            state.rawWallet = "";
            state.walletFriendly = "";
            state.loading = false;
            state.error = null;
        },
        setTonBalance: (state, action) => {
            state.balanceTon = action.payload;
        },
        setWalletRaw(state, action: PayloadAction<string>) {
            state.rawWallet = action.payload;
        },
        setRefCandidate: (state, action: PayloadAction<string | null>) => {
            state.refCandidate = action.payload;
        },
        clearRefCandidate: (state) => {
            state.refCandidate = null;
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
            })
            .addCase(fetchDepositHistory.pending, (state) => {
            state.depositLoading = true;
            state.depositError = null;
            })
            .addCase(fetchDepositHistory.fulfilled, (state, action) => {
                state.depositLoading = false;
                state.depositHistory = action.payload ?? [];
            })
            .addCase(fetchDepositHistory.rejected, (state, action) => {
                state.depositLoading = false;
                state.depositError = action.error.message ?? 'Failed to load deposits';
            })
            .addCase(applyReferral.fulfilled, (state, action) => {
            if (state.userData) state.userData.invitedBy = action.payload.invitedBy;
        });
    },
});

export const { setTelegramUser,clearWallet, setTonBalance, setWalletRaw, setRefCandidate, clearRefCandidate } = userSlice.actions;
export default userSlice.reducer;
