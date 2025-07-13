export const getTelegramUser = () => {
    // @ts-ignore
    const tg = window.Telegram?.WebApp;
    return tg?.initDataUnsafe?.user || null;
};