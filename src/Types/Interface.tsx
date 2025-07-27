import type {JSX} from "react";

export interface ModalState {
    showArr: boolean[];
    rates: string[];
    selectedRate: string;
    showRecovery: boolean;
}

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
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
    name: string; // свойство, которое ты используешь (если кастомное)
}