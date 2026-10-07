"use client";

import type { ReactNode } from "react";

import { Footer } from "./footer";
import { LanguageSelect, useLocale } from "./locale";
import { Logo } from "./logo";
import { WalletButton } from "./wallet-button";

/** The header (name, language, wallet) and the footer shared by every page. */
export function Frame({ children }: { children: ReactNode }) {
    const { t } = useLocale();
    return (
        <div className="flex min-h-dvh flex-col">
            <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
                <div className="mx-auto flex w-full max-w-[64rem] items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6">
                    <a href="/" aria-label="OPUS" className="shrink-0 no-underline">
                        <Logo tagline={t("brand.tagline")} />
                    </a>
                    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                        <LanguageSelect />
                        <WalletButton />
                    </div>
                </div>
            </header>
            {children}
            <Footer />
        </div>
    );
}
