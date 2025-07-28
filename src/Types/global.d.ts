interface TelegramWebAppUser {
    last_name: string;
    first_name: string;
    id: number;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
}

interface TelegramWebAppInitDataUnsafe {
    user?: TelegramWebAppUser;
    [key: string]: never;
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramWebAppInitDataUnsafe;
    // ты можешь добавить сюда и другие методы (openLink, expand и т.д.)
}

interface TelegramNamespace {
    WebApp: TelegramWebApp;
}

interface Window {
    Telegram?: TelegramNamespace;
}
