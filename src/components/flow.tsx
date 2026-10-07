"use client";

import type { Flow } from "../lib/guide";
import { useLocale } from "./locale";

function Arrow() {
    return (
        <>
            {/* down on a phone, right on a wide screen */}
            <svg className="md:hidden" width="24" height="28" viewBox="0 0 24 28" aria-hidden="true">
                <path
                    d="M12 2v20m0 0l-7-7m7 7l7-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <svg className="hidden md:block" width="36" height="24" viewBox="0 0 36 24" aria-hidden="true">
                <path
                    d="M2 12h28m0 0l-7-7m7 7l-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
}

/** A small picture of where the money goes: boxes joined by labelled arrows. Stacked on a phone, in a row on a PC. */
export function FlowDiagram({ flow }: { flow: Flow }) {
    const { t } = useLocale();
    return (
        <div
            className="flex flex-col items-stretch md:flex-row md:items-center"
            role="group"
            aria-label={flow.nodes.map((n) => t(n.title)).join(" → ")}
        >
            {flow.nodes.map((node, i) => (
                <div key={`${node.title}-${i}`} className="contents">
                    <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-2xl border border-line bg-surface p-3 text-center sm:p-4">
                        <span className="font-display text-[16px] font-bold leading-tight">{t(node.title)}</span>
                        <span className="text-[13px] leading-snug text-muted">{t(node.sub)}</span>
                    </div>
                    {i < flow.arrows.length && (
                        <div className="flex flex-col items-center justify-center gap-1 px-2 py-2 text-center text-accent md:w-28 md:shrink-0">
                            <Arrow />
                            <span className="text-[12.5px] font-semibold leading-snug">{t(flow.arrows[i])}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
