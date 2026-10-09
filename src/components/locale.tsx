"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
    LOCALE_NAMES,
    LOCALES,
    choiceCookie,
    initialLocale,
    isLocale,
    readCookie,
    translate,
    type Locale,
    type MessageKey,
} from "../lib/i18n";

const COOKIE = "opus_locale";

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({
    locale: "en",
    setLocale: () => undefined,
});

/**
 * Starts from `?lang=` in the address, else the language chosen last time (a cookie), else the browser's own language
 * if the site has it, else English, and keeps `<html lang>` in step. A choice is remembered for a year.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setState] = useState<Locale>("en");
    const remember = useCallback((value: Locale) => {
        try {
            document.cookie = choiceCookie(COOKIE, value, window.location.protocol === "https:");
        } catch {
            // Cookies may be refused; the choice still holds for this visit.
        }
    }, []);
    useEffect(() => {
        let fromUrl: string | null = null;
        let saved: string | null = null;
        let browser: readonly string[] = [];
        try {
            fromUrl = new URLSearchParams(window.location.search).get("lang");
            saved = readCookie(document.cookie, COOKIE);
            browser = navigator.languages?.length ? navigator.languages : [navigator.language];
        } catch {
            // No cookies and no browser list: English.
        }
        setState(initialLocale(fromUrl, saved, browser));
        if (isLocale(fromUrl)) remember(fromUrl);
    }, [remember]);
    useEffect(() => {
        document.documentElement.lang = locale === "zh" ? "zh-Hans" : locale;
    }, [locale]);
    const setLocale = useCallback(
        (next: Locale) => {
            setState(next);
            remember(next);
        },
        [remember]
    );
    const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** The reader's language, a setter, and `t(key, vars)` bound to it. */
export function useLocale() {
    const { locale, setLocale } = useContext(LocaleContext);
    const t = useCallback(
        (key: MessageKey, vars?: Record<string, string | number>) => translate(locale, key, vars),
        [locale]
    );
    return { locale, setLocale, t };
}

/** The language menu in the top bar. Each language is named in itself. */
export function LanguageSelect() {
    const { locale, setLocale, t } = useLocale();
    return (
        <select
            aria-label={t("nav.language")}
            className="h-10 w-[6.5rem] rounded-lg border border-line bg-surface pl-2 pr-6 text-[14px] sm:w-auto sm:pl-2.5 sm:pr-7 font-medium text-ink-soft hover:border-ink-soft"
            value={locale}
            onChange={(event) => {
                if (isLocale(event.target.value)) setLocale(event.target.value);
            }}
        >
            {LOCALES.map((code) => (
                <option key={code} value={code}>
                    {LOCALE_NAMES[code]}
                </option>
            ))}
        </select>
    );
}
