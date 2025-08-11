import type {TelegramUser} from "../Types/Interface.tsx";
import {useRef} from "react";

export const useTelegramUser = (): TelegramUser | null => {
    const startRef = useRef<string | null>(null);
    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (startRef.current === null) {
        startRef.current =
            tg?.initDataUnsafe?.start_param ??
            new URLSearchParams(location.search).get("startapp") ??
            new URLSearchParams(location.search).get("start") ??
            null;
    }

    if (!user) return null;

    return {
        ...user,
        startRef
    };
};
