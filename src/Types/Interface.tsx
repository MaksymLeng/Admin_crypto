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