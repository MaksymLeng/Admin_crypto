import type {JSX} from "react";
import type {UserType} from "./Types.tsx";

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

export interface WithdrawProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface TelegramUser {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
    name: string; // свойство, которое ты используешь (если кастомное)
}

export interface UserState {
    telegramUser: TelegramUser | null;
    userData: UserType | null;
    walletFriendly: string;
}