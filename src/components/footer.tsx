"use client";

import { footerLinks } from "../lib/links";
import { useLocale } from "./locale";

/** The whitepaper, the architecture and the source, at the foot of the page. */
export function Footer() {
    const { locale, t } = useLocale();
    const links = footerLinks(locale);
    const items = [
        { href: links.whitepaper, label: t("footer.whitepaper") },
        { href: links.architecture, label: t("footer.architecture") },
        { href: links.github, label: t("footer.github") },
        { href: "/guide/", label: t("nav.guide"), external: false },
    ];
    return (
        <footer className="border-t border-line">
            <div className="mx-auto flex w-full max-w-[64rem] flex-col items-center gap-4 px-4 py-8 text-center sm:px-6">
                <nav aria-label="OPUS" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    {items.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            {...("external" in item && item.external === false
                                ? {}
                                : { target: "_blank", rel: "noopener noreferrer" })}
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
