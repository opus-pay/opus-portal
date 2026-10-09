"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { LOCALE_NAMES, LOCALES, initialLocale, isLocale, translate, type Locale, type MessageKey } from "../lib/i18n";

const STORAGE_KEY = "opus.portal.locale";

const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({
    locale: "en",
    setLocale: () => undefined,
});

/** Starts from the language chosen last time, else English, and keeps `<html lang>` in step. */
export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setState] = useState<Locale>("en");
    useEffect(() => {
        let saved: string | null = null;
        try {
            saved = window.localStorage.getItem(STORAGE_KEY);
        } catch {
            saved = null;
        }
        setState(initialLocale(saved));
    }, []);
    useEffect(() => {
        document.documentElement.lang = locale === "zh" ? "zh-Hans" : locale;
    }, [locale]);
    const setLocale = useCallback((next: Locale) => {
        setState(next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // A private window may refuse storage; the choice still holds for this visit.
        }
    }, []);
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
