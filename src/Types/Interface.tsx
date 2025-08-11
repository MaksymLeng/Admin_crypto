import type {JSX} from "react";
import type {Deposit, UserType} from "./Types.tsx";

export interface AppRoute {
    path: string
    element: JSX.Element
    name: string
}

export interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    recoveryPhrase?: string[]
}

export interface TelegramUser {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
    startParam?: string;
}

export interface UserState {
    telegramUser: TelegramUser | null;
    userData: UserType | null;
    walletFriendly: string;
    rawWallet: string;
    balanceTon: number;
    loading: boolean;
    error: string | null;
    depositHistory: Deposit[];
    depositLoading: boolean;
    depositError: string | null;
    refCandidate: string | null,
}

export interface TradeState {
    data: Trade[];
    loading: boolean;
}

export interface Trade {
    coin: string
    change: string
    cm: string
    amount: string
    rawAmount: number
}

export interface CreateDepositResponse {
    depositAddress: string;
    payload: string;
    expiresAt: number;
}