import type { Locale } from "./i18n";

export type FooterLinks = { whitepaper: string; architecture: string; github: string };

const DEFAULT_GITHUB = "https://github.com/opus-pay";
const DEFAULT_DOCS = "https://github.com/opus-pay/opus-osx/blob/main";

const trim = (value: string | undefined, fallback: string) => {
    const text = value?.trim();
    return text === undefined || text === "" ? fallback : text.replace(/\/+$/, "");
};

/**
 * The footer links. The whitepaper and its architecture chapter live in the OPUS repository; Korean readers get
 * the Korean whitepaper. `env` is a parameter so a test can pass its own settings.
 */
export function footerLinks(
    locale: Locale,
    env: Record<string, string | undefined> = {
        NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
        NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    }
): FooterLinks {
    const docs = trim(env.NEXT_PUBLIC_DOCS_URL, DEFAULT_DOCS);
    const korean = locale === "ko";
    const whitepaper = `${docs}/${korean ? "WHITEPAPER.ko.md" : "WHITEPAPER.md"}`;
    return {
        whitepaper,
        // The English whitepaper has a chapter "5. Architecture"; the Korean one is opened at the top.
        architecture: korean ? whitepaper : `${whitepaper}#5-architecture`,
        github: trim(env.NEXT_PUBLIC_GITHUB_URL, DEFAULT_GITHUB),
    };
}
