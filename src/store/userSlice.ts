import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type {UserType} from "../Types/Types.tsx"; // Это тип с бэка
import type {TelegramUser} from "../Types/Interface.tsx"; // Это тип Telegram WebApp
import type {UserState} from "../Types/Interface.tsx"


const initialState: UserState = {
    telegramUser: null,
    userData: null,
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
    },
});

export const { setTelegramUser } = userSlice.actions;
export default userSlice.reducer;
