"use client";

import { descKey, isOpen, type Service } from "../lib/services";
import { useLocale } from "./locale";

const BASE = "flex h-full flex-col gap-3 rounded-2xl border p-5";

/**
 * One service. An open one is a link. A planned one is a plain box that cannot be focused, clicked or selected,
 * and says so to a screen reader, so nobody is led to a page that is not there.
 */
export function ServiceCard({ service }: { service: Service }) {
    const { t } = useLocale();
    const name = service.name;
    const open = isOpen(service);
    const body = (
        <>
            <div className="flex items-start justify-between gap-3">
                <h3 className="m-0 font-display text-[20px] font-bold leading-tight">{name}</h3>
                <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[12.5px] font-bold ${
                        open ? "bg-money-wash text-money-ink" : "bg-sunken text-muted"
                    }`}
                >
                    {open ? t("status.live") : t("status.planned")}
                </span>
            </div>
            <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">{t(descKey(service.id))}</p>
        </>
    );
    if (open) {
        return (
            <a
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("card.go", { name })}
                className={`${BASE} border-line bg-surface text-ink no-underline transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md`}
            >
                {body}
            </a>
        );
    }
    return (
        <div
            aria-disabled="true"
            aria-label={t("card.planned", { name })}
            className={`${BASE} pointer-events-none cursor-not-allowed select-none border-dashed border-line bg-sunken opacity-60`}
        >
            {body}
        </div>
    );
}
