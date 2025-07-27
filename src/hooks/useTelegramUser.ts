export const getTelegramUser = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tg = window.Telegram?.WebApp;
    return tg?.initDataUnsafe?.user || null;
};