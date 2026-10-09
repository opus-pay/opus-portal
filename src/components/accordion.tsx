"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * One item of a list that shows only titles: pressing a title opens its text just below it, pressing it again closes
 * it. `id` also makes the item a target: a link to `#id` opens it. The text is not drawn until the item is open.
 */
export function Accordion({
    id,
    title,
    children,
    defaultOpen = false,
}: {
    id: string;
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);

    useEffect(() => {
        const open_ = () => {
            if (window.location.hash === `#${id}`) {
                setOpen(true);
                requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
            }
        };
        open_();
        window.addEventListener("hashchange", open_);
        return () => window.removeEventListener("hashchange", open_);
    }, [id]);

    return (
        <section id={id} className="scroll-mt-20 rounded-2xl border border-line bg-surface">
            <h2 className="m-0">
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${id}-body`}
                    onClick={() => setOpen((now) => !now)}
                    className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border-0 bg-transparent px-4 py-3 text-left font-display text-[18px] font-bold text-ink sm:px-5"
                >
                    <span>{title}</span>
                    <span
                        aria-hidden="true"
                        className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
                    >
                        ▾
                    </span>
                </button>
            </h2>
            {open && (
                <div id={`${id}-body`} className="mx-4 flex flex-col gap-4 border-t border-line pb-4 pt-4 sm:mx-5">
                    {children}
                </div>
            )}
        </section>
    );
}
