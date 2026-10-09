"use client";

import { footerLinks } from "../lib/links";
import { useLocale } from "./locale";

/** The architecture, the source and the other pages, at the foot of the page. */
export function Footer() {
    const { t } = useLocale();
    const links = footerLinks();
    const items = [
        { href: "/architecture/", label: t("footer.architecture") },
        { href: links.github, label: t("footer.github") },
        { href: "/guide/", label: t("nav.guide") },
        { href: "/network/", label: t("nav.network") },
        { href: "/testnet/", label: t("nav.testnet") },
    ];
    return (
        <footer className="border-t border-line">
            <div className="mx-auto flex w-full max-w-[64rem] flex-col items-center gap-4 px-4 py-8 text-center sm:px-6">
                <nav aria-label="OPUS" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {items.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-[15px] font-semibold text-ink no-underline hover:text-accent hover:underline"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <p className="m-0 max-w-[40rem] text-[13px] leading-relaxed text-muted">{t("footer.note")}</p>
            </div>
        </footer>
    );
}
