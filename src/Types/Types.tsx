import { z } from 'zod';
import {depositSchema} from "../components/DepositModal/DepositModal.tsx";

export type Trade = {
    coin: string;
    change: string;
    cm: string;
    amount: string;
    rawAmount: number;
};

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
