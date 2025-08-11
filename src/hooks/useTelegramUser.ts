import type {TelegramUser} from "../Types/Interface.tsx";
import {useMemo} from "react";

export const useTelegramUser = (): TelegramUser | null => {
    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    const startParam = useMemo(() => {
        const p1 = tg?.initDataUnsafe?.start_param as string | undefined;
        const qs = new URLSearchParams(location.search);
        const p2 = (qs.get("startapp") || qs.get("start")) ?? undefined;
        return p1 || p2 || null;
    }, [tg]);


    if (!user) return null;

    return {
        ...user,
        startParam
    };
};
