"use client";

import { EXCHANGES, FLOWS, type Flow } from "../lib/guide";
import { FlowDiagram } from "./flow";
import { Frame } from "./frame";
import { useLocale } from "./locale";

function Steps({ flow }: { flow: Flow }) {
    const { t } = useLocale();
    return (
        <ol className="m-0 flex list-none flex-col gap-2 p-0">
            {flow.steps.map((key, i) => (
                <li key={key} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-wash text-[13px] font-bold text-accent"
                    >
                        {i + 1}
                    </span>
                    <span>{t(key)}</span>
                </li>
            ))}
        </ol>
    );
}

function Section({ flow, title }: { flow: Flow; title?: string }) {
    return (
        <section className="flex flex-col gap-4 rounded-2xl border border-line bg-canvas p-4 sm:p-6">
            {title !== undefined && <h3 className="m-0 font-display text-[19px] font-bold">{title}</h3>}
            <FlowDiagram flow={flow} />
            <Steps flow={flow} />
        </section>
    );
}

/** How to bring USDC (and a little POL) in from an exchange, and send it back. */
export function Guide() {
    const { t } = useLocale();
    return (
        <Frame>
            <main className="mx-auto flex w-full max-w-[64rem] flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
                <section className="flex max-w-[46rem] flex-col gap-3">
                    <h1 className="m-0 font-display text-[28px] font-bold leading-tight tracking-tight text-balance sm:text-[36px]">
                        {t("guide.title")}
                    </h1>
                    <p className="m-0 text-[16px] leading-relaxed text-ink-soft">{t("guide.intro")}</p>
                </section>

                <section aria-labelledby="need" className="flex flex-col gap-4">
                    <h2 id="need" className="m-0 font-display text-[22px] font-bold">
                        {t("guide.need.title")}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5">
                            <h3 className="m-0 font-display text-[18px] font-bold">{t("guide.need.usdc.title")}</h3>
                            <p className="m-0 text-[15px] leading-relaxed text-ink-soft">{t("guide.need.usdc.body")}</p>
                        </div>
                        <div className="flex flex-col gap-2 rounded-2xl border-2 border-accent bg-accent-wash p-5">
                            <h3 className="m-0 font-display text-[18px] font-bold">{t("guide.need.pol.title")}</h3>
                            <p className="m-0 text-[15px] leading-relaxed text-ink-soft">{t("guide.need.pol.body")}</p>
                        </div>
                    </div>
                    <p className="m-0 text-[14.5px] leading-relaxed text-muted">{t("guide.need.gasless")}</p>
                </section>

                <section
                    aria-labelledby="safety"
                    className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5"
                >
                    <h2 id="safety" className="m-0 font-display text-[20px] font-bold">
                        {t("guide.safety.title")}
                    </h2>
                    <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-ink-soft">
                        <li>{t("guide.safety.network")}</li>
                        <li>{t("guide.safety.token")}</li>
                        <li>{t("guide.safety.test")}</li>
                        <li>{t("guide.safety.final")}</li>
                    </ul>
                </section>

                <section aria-labelledby="exchanges" className="flex flex-col gap-4">
                    <h2 id="exchanges" className="m-0 font-display text-[22px] font-bold">
                        {t("guide.exchanges.title")}
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {EXCHANGES.map((ex) => (
                            <a
                                key={ex.id}
                                href={ex.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 text-ink no-underline transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                            >
                                <span className="font-display text-[19px] font-bold">{ex.name}</span>
                                <span className="text-[14.5px] leading-relaxed text-ink-soft">{t(ex.desc)}</span>
                                <span className="text-[14px] font-semibold text-accent">
                                    {t("guide.exchange.open", { name: ex.name })} ↗
                                </span>
                            </a>
                        ))}
                    </div>
                    <p className="m-0 text-[13.5px] leading-relaxed text-muted">{t("guide.exchanges.note")}</p>
                </section>

                <section aria-labelledby="in" className="flex flex-col gap-4">
                    <h2 id="in" className="m-0 font-display text-[22px] font-bold">
                        {t("guide.in.title")}
                    </h2>
                    <Section flow={FLOWS.gate} title={t("guide.in.gate")} />
                    <Section flow={FLOWS.upbit} title={t("guide.in.upbit")} />
                </section>

                <section aria-labelledby="out" className="flex flex-col gap-4">
                    <h2 id="out" className="m-0 font-display text-[22px] font-bold">
                        {t("guide.out.title")}
                    </h2>
                    <Section flow={FLOWS.out} />
                </section>

                <p className="m-0 text-[13.5px] leading-relaxed text-muted">{t("guide.disclaimer")}</p>
            </main>
        </Frame>
    );
}
