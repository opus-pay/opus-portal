"use client";

import { useState } from "react";

import { ITEMS, type ArchBlock } from "../lib/architecture";
import { ARCH_TEXT, type ArchText } from "../lib/architecture-text";
import type { SeqStep } from "../lib/sequence";
import { Accordion } from "./accordion";
import { Frame } from "./frame";
import { useLocale } from "./locale";
import { SequenceDiagram } from "./sequence";

/** Four stacked boxes, each a layer; the arrows between them show who calls whom. */
function Layers({
    layers,
    caption,
    text,
}: {
    layers: { title: string; body: string }[];
    caption: string;
    text: ArchText;
}) {
    const word = (key: string) => text[key as keyof ArchText];
    return (
        <figure className="m-0 flex flex-col gap-2">
            <div className="flex flex-col items-stretch gap-1.5">
                {layers.map((layer, i) => (
                    <div key={layer.title} className="flex flex-col items-stretch gap-1.5">
                        <div
                            className={`rounded-xl border p-3 ${
                                i === layers.length - 1
                                    ? "border-2 border-accent bg-accent-wash"
                                    : "border-line bg-canvas"
                            }`}
                        >
                            <div className="text-[16px] font-bold">{word(layer.title)}</div>
                            <div className="text-[14px] leading-relaxed text-ink-soft">{word(layer.body)}</div>
                        </div>
                        {i < layers.length - 1 && (
                            <span aria-hidden="true" className="text-center text-muted">
                                ▼
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <figcaption className="text-[13.5px] text-muted">{word(caption)}</figcaption>
        </figure>
    );
}

function Block({ block, text }: { block: ArchBlock; text: ArchText }) {
    const word = (key: string) => text[key as keyof ArchText];
    switch (block.t) {
        case "p":
            return <p className="m-0 text-[15px] leading-relaxed text-ink-soft">{word(block.text)}</p>;
        case "list":
            return (
                <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-ink-soft">
                    {block.items.map((key) => (
                        <li key={key}>{word(key)}</li>
                    ))}
                </ul>
            );
        case "terms":
            return (
                <dl className="m-0 flex flex-col gap-3">
                    {block.terms.map((term) => (
                        <div key={term.term} className="flex flex-col gap-0.5">
                            <dt className="text-[15px] font-bold">{word(term.term)}</dt>
                            <dd className="m-0 text-[14.5px] leading-relaxed text-ink-soft">{word(term.body)}</dd>
                        </div>
                    ))}
                </dl>
            );
        case "layers":
            return <Layers layers={block.layers} caption={block.caption} text={text} />;
        default: {
            const steps: SeqStep[] = block.steps.map((step) => ({ ...step, text: word(step.text) }));
            return (
                <div className="flex flex-col gap-1.5">
                    <SequenceDiagram label={word(block.label)} actors={block.actors.map(word)} steps={steps} />
                    <p className="m-0 text-[13px] text-muted sm:hidden">{word("arch.scroll")}</p>
                </div>
            );
        }
    }
}

/** The architecture of OPUS as a list of titles; a title opens its text and diagram just below it. */
export function Architecture() {
    const { locale } = useLocale();
    const text = ARCH_TEXT[locale];
    // Bumping `epoch` remounts the items, which is how "open all" / "close all" reach each one's own state.
    const [all, setAll] = useState<{ open: boolean; epoch: number }>({ open: false, epoch: 0 });
    return (
        <Frame>
            <main className="mx-auto flex w-full max-w-[52rem] flex-1 flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
                <section className="flex max-w-[46rem] flex-col gap-3">
                    <h1 className="m-0 font-display text-[28px] font-bold leading-tight tracking-tight text-balance sm:text-[36px]">
                        {text["arch.title"]}
                    </h1>
                    <p className="m-0 text-[16px] leading-relaxed text-ink-soft">{text["arch.intro"]}</p>
                    <button
                        type="button"
                        onClick={() => setAll((now) => ({ open: !now.open, epoch: now.epoch + 1 }))}
                        className="cursor-pointer self-start border-0 bg-transparent p-0 text-[14.5px] font-semibold text-accent underline"
                    >
                        {text[all.open ? "arch.collapseAll" : "arch.expandAll"]}
                    </button>
                </section>

                <div className="flex flex-col gap-3">
                    {ITEMS.map((item) => (
                        <Accordion
                            key={`${item.id}-${all.epoch}`}
                            id={item.id}
                            title={text[item.title as keyof ArchText]}
                            defaultOpen={all.open}
                        >
                            {item.blocks.map((block, i) => (
                                <Block key={i} block={block} text={text} />
                            ))}
                        </Accordion>
                    ))}
                </div>
            </main>
        </Frame>
    );
}
