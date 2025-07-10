import {store} from "../store";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type Trade = {
    coin: string;
    change: string;
    cm: string;
    amount: string;
};