"use client";

import { EXCHANGES, FLOWS, type Flow } from "../lib/guide";
import { Accordion } from "./accordion";
import { Concepts } from "./concepts";
import { FlowDiagram } from "./flow";
import { Frame } from "./frame";
import { useLocale } from "./locale";

/** Makes every "Polygon" in a text stand out, so the network is hard to miss. */
function emphasize(text: string) {
    return text.split(/(Polygon)/).map((part, i) =>
        part === "Polygon" ? (
            <strong key={i} className="font-bold text-ink">
                {part}
            </strong>
        ) : (
            part
        )
    );
}

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
                    <span>{emphasize(t(key))}</span>
                </li>
            ))}
        </ol>
    );
}

function Section({ flow }: { flow: Flow }) {
    return (
        <div className="flex flex-col gap-4">
            <FlowDiagram flow={flow} />
            <Steps flow={flow} />
        </div>
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

                <div
                    role="note"
                    className="flex items-start gap-3 rounded-2xl border-2 border-accent bg-accent-fill p-4 text-white sm:p-5"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 shrink-0">
                        <path
                            d="M12 3l10 18H2L12 3zm0 6v6m0 3v.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <p className="m-0 text-[16px] font-semibold leading-relaxed">{t("guide.polygon.banner")}</p>
                </div>

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

                {/* Only the titles show at first; the rest opens when its title is pressed. */}
                <div className="flex flex-col gap-3">
                    <Accordion id="concepts" title={t("concept.title")}>
                        <Concepts untitled />
                    </Accordion>

                    <Accordion id="safety" title={t("guide.safety.title")}>
                        <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-ink-soft">
                            <li>{emphasize(t("guide.safety.network"))}</li>
                            <li>{t("guide.safety.token")}</li>
                            <li>{t("guide.safety.test")}</li>
                            <li>{t("guide.safety.final")}</li>
                        </ul>
                    </Accordion>

                    <Accordion id="exchanges" title={t("guide.exchanges.title")}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {EXCHANGES.map((ex) => (
                                <a
                                    key={ex.id}
                                    href={ex.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col gap-2 rounded-2xl border border-line bg-canvas p-5 text-ink no-underline transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
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
                    </Accordion>

                    <Accordion id="in-gate" title={`${t("guide.in.title")} · ${t("guide.in.gate")}`}>
                        <Section flow={FLOWS.gate} />
                    </Accordion>

                    <Accordion id="in-upbit" title={`${t("guide.in.title")} · ${t("guide.in.upbit")}`}>
                        <Section flow={FLOWS.upbit} />
                    </Accordion>

                    <Accordion id="out" title={t("guide.out.title")}>
                        <Section flow={FLOWS.out} />
                    </Accordion>
                </div>

                <p className="m-0 text-[13.5px] leading-relaxed text-muted">{t("guide.disclaimer")}</p>
            </main>
        </Frame>
    );
}
