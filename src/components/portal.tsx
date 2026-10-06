"use client";

import { listingContact } from "../lib/links";
import { SERVICES } from "../lib/services";
import { Footer } from "./footer";
import { LanguageSelect, useLocale } from "./locale";
import { ServiceCard } from "./service-card";
import { WalletButton } from "./wallet-button";

/** The whole page: the wallet at the top, the services in the middle, the whitepaper, architecture and GitHub below. */
export function Portal() {
    const { t } = useLocale();
    const contact = listingContact();
    return (
        <div className="flex min-h-dvh flex-col">
            <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
                <div className="mx-auto flex w-full max-w-[64rem] items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6">
                    <a
                        href="/"
                        className="flex shrink-0 items-center gap-2 whitespace-nowrap text-ink no-underline sm:gap-2.5"
                    >
                        <img src="/icon.svg" alt="" width={30} height={30} />
                        <span className="flex flex-col leading-tight">
                            <span className="font-display text-[19px] font-bold tracking-tight">OPUS</span>
                            <span className="hidden text-[12px] text-muted sm:block">{t("brand.tagline")}</span>
                        </span>
                    </a>
                    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                        <LanguageSelect />
                        <WalletButton />
                    </div>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-[64rem] flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
                <section className="mx-auto flex max-w-[44rem] flex-col gap-3 text-center">
                    <h1 className="m-0 font-display text-[30px] font-bold leading-tight tracking-tight text-balance sm:text-[40px]">
                        {t("hero.title")}
                    </h1>
                    <p className="m-0 text-[16px] leading-relaxed text-ink-soft">{t("hero.intro")}</p>
                </section>
                <section aria-labelledby="services" className="flex flex-col gap-4">
                    <h2 id="services" className="sr-only">
                        {t("services.title")}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {SERVICES.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                    <div className="mx-auto flex max-w-[40rem] flex-col items-center gap-3 pt-2 text-center">
                        <p className="m-0 text-[14px] leading-relaxed text-muted">{t("listing.note")}</p>
                        {contact !== undefined && (
                            <a
                                href={contact}
                                className="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-[14.5px] font-semibold text-ink no-underline hover:border-accent hover:text-accent"
                            >
                                {t("listing.cta")}
                            </a>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
