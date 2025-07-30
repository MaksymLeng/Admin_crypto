import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type {UserType} from "../Types/Types.tsx"; // Это тип с бэка
import type {TelegramUser} from "../Types/Interface.tsx"; // Это тип Telegram WebApp
import type {UserState} from "../Types/Interface.tsx"


const initialState: UserState = {
    telegramUser: null,
    userData: null,
    walletRaw: '',
    walletFriendly: '',
};

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (telegramUser: TelegramUser) => {
        const res = await fetch(
            `http://localhost:3000/api/user?id=${telegramUser.id}&username=${telegramUser.username}`
        );
        const data: UserType = await res.json();
        return data;
    }
);

export const updateWallet = createAsyncThunk(
    'user/updateWallet',
    async ({ id, address }: { id: number; address: string }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/api/user/setWallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, address }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue('Ошибка при обновлении кошелька');
        }
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
            state.walletRaw = action.payload.walletRaw;
            state.walletFriendly = action.payload.walletFriendly;
        });
    },
});

export const { setTelegramUser } = userSlice.actions;
export default userSlice.reducer;
