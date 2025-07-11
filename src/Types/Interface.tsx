import type {JSX} from "react";

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