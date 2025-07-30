import store from "../store";
import { z } from 'zod';
import {depositSchema} from "../components/DepositModal/DepositModal.tsx";

export type RootState = ReturnType<typeof store.getState>;

export type Trade = {
    coin: string;
    change: string;
    cm: string;
    amount: string;
};

export type Action<T = unknown> = {
    type: string;
    payload?: T;
}

export type ModalState = {
    showArr: boolean[],
};

export type UserType = {
    id: string;
    username: string;
    avatar?: string;
    depositSum: number;
    referralCount: number;
    Balance: number;
    Available: number;
    WithdrawalDate: string;
};

export type DepositValues = z.infer<typeof depositSchema>;
