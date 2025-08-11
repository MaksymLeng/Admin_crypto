import type {useTelegramUserReturn} from "../Types/Types.tsx";


export const useTelegramUser = (): useTelegramUserReturn | null => {
    const tg = window.Telegram?.WebApp;
    const tgUser = tg?.initDataUnsafe?.user;
    const start_param  = tg?.initDataUnsafe?.start_param ?? null;

    if (!tgUser) return null;

    return {
        tgUser,
        start_param
    };
};
