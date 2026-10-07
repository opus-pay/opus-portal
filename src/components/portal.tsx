"use client";

import { SERVICES } from "../lib/services";
import { Frame } from "./frame";
import { useLocale } from "./locale";
import { ServiceCard } from "./service-card";

/** The whole page: the wallet at the top, the services in the middle, the whitepaper, architecture and GitHub below. */
export function Portal() {
    const { t } = useLocale();
    return (
        <Frame>
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
                </section>
                <a
                    href="/guide/"
                    className="mx-auto flex w-full max-w-[44rem] flex-col gap-1 rounded-2xl border-2 border-accent bg-accent-wash p-5 text-ink no-underline transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <span className="font-display text-[19px] font-bold">{t("guide.home.title")}</span>
                    <span className="text-[14.5px] leading-relaxed text-ink-soft">{t("guide.home.desc")}</span>
                    <span className="text-[14px] font-semibold text-accent">{t("guide.home.go")} →</span>
                </a>
            </main>
        </Frame>
    );
}
