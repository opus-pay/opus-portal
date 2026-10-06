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

/**
 * The "list your service" contact as a mail link, or `undefined` when no address is set (or it is not an e-mail
 * address), in which case the page shows no button. Listing is by agreement, so there is no form and no sign-up.
 */
export function listingContact(
    env: Record<string, string | undefined> = { NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL }
): string | undefined {
    const email = env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
    return email !== undefined && /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)
        ? `mailto:${email}?subject=${encodeURIComponent("OPUS Portal listing")}`
        : undefined;
}
