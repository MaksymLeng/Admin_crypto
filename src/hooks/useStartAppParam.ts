// hooks/useStartAppParam.ts
import { useState, useMemo } from "react";

const STORAGE_KEY = "twa_start_param";

/** 1) Из URL: tgWebAppStartParam (официально промапленное поле для Mini Apps) */
function getFromUrl(): string | null {
    try {
        const search = new URLSearchParams(window.location.search);
        const hash = new URLSearchParams(window.location.hash?.replace(/^#/, ""));
        return search.get("tgWebAppStartParam") || hash.get("tgWebAppStartParam");
    } catch {
        return null;
    }
}

/** 2) Из Telegram.WebApp.initDataUnsafe.start_param (может быть пустым на части клиентов) */
function getFromUnsafe(): string | null {
    try {
        const wa = window.Telegram?.WebApp;
        const v = wa?.initDataUnsafe?.start_param ?? wa?.initDataUnsafe?.startParam;
        return v ? String(v) : null;
    } catch {
        return null;
    }
}

/** 3) Из «сырого» initData (строка querystring), если нужно добить крайние случаи */
function getFromRawInitData(): string | null {
    try {
        const wa = window.Telegram?.WebApp;
        const raw: string | undefined = wa?.initData;
        if (!raw) return null;
        const qs = new URLSearchParams(raw);
        const v = qs.get("start_param") || qs.get("startParam");
        return v ? String(v) : null;
    } catch {
        return null;
    }
}

/** Единоразовое определение с кэшированием */
function resolveOnce(): string | null {
    return getFromUrl() ?? getFromUnsafe() ?? getFromRawInitData();
}

/**
 * Возвращает стабильный startapp-параметр.
 * Алгоритм:
 *  - сначала берем из sessionStorage (если уже кэшировалось),
 *  - иначе пытаемся вытащить из URL -> unsafe -> raw initData,
 *  - если нашли — кладём в sessionStorage и возвращаем.
 * Значение после монтирования не меняется (стабильно).
 */
export function useStartAppParam(): string | null {
    const [initial] = useState<string | null>(() => {
        const cached = sessionStorage.getItem(STORAGE_KEY);
        if (cached) return cached;
        const found = resolveOnce();
        if (found) sessionStorage.setItem(STORAGE_KEY, found);
        return found ?? null;
    });

    // стабильная ссылка/значение, не триггерит эффекты повторно
    return useMemo(() => initial, [initial]);
}

/** Опционально: ручной сброс (например, после успешного бинда реферала) */
useStartAppParam.reset = () => {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (error) {
        console.error(`Ошибка ${error}`);
    }
};
