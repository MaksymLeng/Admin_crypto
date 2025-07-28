import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type {TelegramUser, UserType} from "../Types/Types.tsx";
import type {ServerUserData, UserState} from "../Types/Interface.tsx";

const initialState: UserState = {
    tgUser: null,
    serverUser: null,
    loading: false,
    error: null,
};

// async thunk
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (telegramUser: TelegramUser) => {
        const res = await fetch(`http://localhost:3000/api/user?id=${telegramUser.id}&username=${telegramUser.username}`);
        if (!res.ok) throw new Error("Ошибка запроса");
        const data = await res.json();
        return data as UserType;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTgUser: (state, action: PayloadAction<TelegramUser>) => {
            state.tgUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<ServerUserData>) => {
                state.loading = false;
                state.serverUser = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка';
            });
    },
});

export const { setTgUser } = userSlice.actions;
export default userSlice.reducer;