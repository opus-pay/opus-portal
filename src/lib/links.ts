export type FooterLinks = { github: string };

const DEFAULT_GITHUB = "https://github.com/opus-pay";

const trim = (value: string | undefined, fallback: string) => {
    const text = value?.trim();
    return text === undefined || text === "" ? fallback : text.replace(/\/+$/, "");
};

/** The footer links. `env` is a parameter so a test can pass its own settings. */
export function footerLinks(
    env: Record<string, string | undefined> = {
        NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    }
): FooterLinks {
    return {
        github: trim(env.NEXT_PUBLIC_GITHUB_URL, DEFAULT_GITHUB),
    };
}
