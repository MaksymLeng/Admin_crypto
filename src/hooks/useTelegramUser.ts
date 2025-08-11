import type {TelegramUser} from "../Types/Interface.tsx";

export const useTelegramUser = (): TelegramUser | null => {
    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (!user) return null;

    return {
        ...user,
    };
};
