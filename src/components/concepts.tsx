"use client";

import type { ReactNode } from "react";

import type { MessageKey } from "../lib/i18n";
import { useLocale } from "./locale";

/**
 * Four pictures and one map for people who have never held a coin: what a wallet, a network, USDC and POL are,
 * and where the money goes. Drawn with plain SVG in the theme's colours, so it follows light and dark mode and
 * needs no image files. The words come from the language files; nothing is written into the pictures.
 */
const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round",
    strokeLinejoin: "round",
} as const;
const soft = { fill: "currentColor", fillOpacity: 0.14 } as const;

function WalletIcon() {
    return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 text-accent" aria-hidden="true">
            <rect x="6" y="14" width="46" height="36" rx="7" {...stroke} {...soft} />
            <path d="M14 14l26-8a4 4 0 0 1 5 4v4" {...stroke} />
            <path d="M40 28h18v12H40a6 6 0 0 1 0-12z" {...stroke} fill="currentColor" fillOpacity={0.3} />
            <circle cx="45" cy="34" r="2" fill="currentColor" />
        </svg>
    );
}

function NetworkIcon() {
    return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 text-accent" aria-hidden="true">
            <path d="M32 14L12 46h40z" {...stroke} />
            <path d="M32 14v22M12 46l20-10M52 46L32 36" {...stroke} strokeWidth={2} strokeDasharray="1 5" />
            <circle cx="32" cy="14" r="7" {...stroke} {...soft} />
            <circle cx="12" cy="46" r="7" {...stroke} {...soft} />
            <circle cx="52" cy="46" r="7" {...stroke} {...soft} />
            <circle cx="32" cy="36" r="3" fill="currentColor" />
        </svg>
    );
}

function UsdcIcon() {
    return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 text-accent" aria-hidden="true">
            <circle cx="32" cy="32" r="25" {...stroke} {...soft} />
            <circle cx="32" cy="32" r="19" {...stroke} strokeWidth={1.5} strokeDasharray="2 4" />
            <path
                d="M38 24.5c-1.2-2-3.4-3-6-3-3.4 0-5.6 1.7-5.6 4.2 0 6.3 12 2.8 12 9.3 0 2.6-2.4 4.5-6.2 4.5-2.9 0-5.4-1.2-6.5-3.4M32 17v4.5m0 21V47"
                {...stroke}
            />
        </svg>
    );
}

function PolIcon() {
    return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 text-accent" aria-hidden="true">
            <path d="M32 5l22 12.5v25L32 55 10 42.5v-25z" {...stroke} {...soft} />
            <path d="M35 17L22 35h9l-3 14 14-19h-9z" {...stroke} fill="currentColor" fillOpacity={0.35} />
        </svg>
    );
}

const CARDS: readonly { id: string; Icon: () => ReactNode; title: MessageKey; body: MessageKey }[] = [
    { id: "wallet", Icon: WalletIcon, title: "concept.wallet.title", body: "concept.wallet.body" },
    { id: "network", Icon: NetworkIcon, title: "concept.network.title", body: "concept.network.body" },
    { id: "usdc", Icon: UsdcIcon, title: "concept.usdc.title", body: "concept.usdc.body" },
    { id: "pol", Icon: PolIcon, title: "concept.pol.title", body: "concept.pol.body" },
];

const NODES: readonly { title: MessageKey; sub: MessageKey }[] = [
    { title: "concept.map.n1.t", sub: "concept.map.n1.s" },
    { title: "concept.map.n2.t", sub: "concept.map.n2.s" },
    { title: "concept.map.n3.t", sub: "concept.map.n3.s" },
    { title: "concept.map.n4.t", sub: "concept.map.n4.s" },
];
const ARROWS: readonly MessageKey[] = ["concept.map.a1", "concept.map.a2", "concept.map.a3"];

function Arrow({ compact }: { compact: boolean }) {
    return (
        <>
            <svg className={compact ? "" : "lg:hidden"} width="24" height="28" viewBox="0 0 24 28" aria-hidden="true">
                <path d="M12 2v20m0 0l-7-7m7 7l7-7" {...stroke} strokeWidth={2.5} />
            </svg>
            <svg
                className={compact ? "hidden" : "hidden lg:block"}
                width="36"
                height="24"
                viewBox="0 0 36 24"
                aria-hidden="true"
            >
                <path d="M2 12h28m0 0l-7-7m7 7l-7 7" {...stroke} strokeWidth={2.5} />
            </svg>
        </>
    );
}

/**
 * The four words and the map of where the money goes. `note` is shown under the map (for example: this is a test
 * network). `compact` stacks the map top to bottom at every width, for a narrow column.
 */
export function Concepts({ note, compact = false }: { note?: ReactNode; compact?: boolean }) {
    const { t } = useLocale();
    return (
        <section aria-labelledby="concept-title" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <h2 id="concept-title" className="m-0 text-[22px] font-bold">
                    {t("concept.title")}
                </h2>
                <p className="m-0 text-[15px] leading-relaxed text-ink-soft">{t("concept.intro")}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CARDS.map(({ id, Icon, title, body }) => (
                    <div key={id} className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
                        <Icon />
                        <div className="flex min-w-0 flex-col gap-1">
                            <h3 className="m-0 text-[17px] font-bold">{t(title)}</h3>
                            <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">{t(body)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 sm:p-5">
                <h3 className="m-0 text-[17px] font-bold">{t("concept.map.title")}</h3>
                <div
                    className={`flex flex-col items-stretch ${compact ? "" : "lg:flex-row lg:items-center"}`}
                    role="group"
                    aria-label={NODES.map((n) => t(n.title)).join(" → ")}
                >
                    {NODES.map((node, i) => (
                        <div key={node.title} className="contents">
                            <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-xl border border-line bg-canvas p-3 text-center">
                                <span className="text-[15.5px] font-bold leading-tight">{t(node.title)}</span>
                                <span className="text-[13px] leading-snug text-muted">{t(node.sub)}</span>
                            </div>
                            {i < ARROWS.length && (
                                <div
                                    className={`flex flex-col items-center justify-center gap-1 px-2 py-2 text-center text-accent ${
                                        compact ? "" : "lg:w-24 lg:shrink-0"
                                    }`}
                                >
                                    <Arrow compact={compact} />
                                    <span className="text-[12.5px] font-semibold leading-snug">{t(ARROWS[i])}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2 rounded-xl border-2 border-dashed border-accent bg-accent-wash p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <p className="m-0 text-[14px] leading-relaxed text-ink-soft">
                        <strong className="text-ink">{t("concept.road.title")}</strong> {t("concept.road.body")}
                    </p>
                    <div className="flex shrink-0 flex-wrap gap-2 text-[13px] font-semibold">
                        <span className="rounded-full bg-surface px-3 py-1 text-ink">{t("concept.chip.usdc")}</span>
                        <span className="rounded-full bg-surface px-3 py-1 text-ink">{t("concept.chip.pol")}</span>
                    </div>
                </div>
                {note !== undefined && <div>{note}</div>}
            </div>
        </section>
    );
}
