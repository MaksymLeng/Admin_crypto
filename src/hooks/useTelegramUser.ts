import type {TelegramUser} from "../Types/Types.tsx";

export const useTelegramUser = (): TelegramUser | null => {
    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (!user) return null;

    return {
        ...user,
        name: `${user.first_name} ${user.last_name ?? ''}`.trim(),
    };
};
