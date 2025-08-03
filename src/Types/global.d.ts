interface TelegramWebAppInitDataUnsafe {
    user?: TelegramWebAppUser;
    start_param?: string;
    [key: string]: never;
}

interface TelegramWebApp {
    ready: () => void;
    BackButton: {
        show: () => void;
        hide: () => void;
        onClick: (cb: () => void) => void;
    };
    close: () => void;
    initData: string;
    initDataUnsafe: TelegramWebAppInitDataUnsafe;
    [key: string]: never;
}

interface TelegramNamespace {
    WebApp: TelegramWebApp;
}

interface Window {
    Telegram?: TelegramNamespace;
}
