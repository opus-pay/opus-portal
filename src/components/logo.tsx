/**
 * The OPUS mark: a ring that is open at the upper right, with a dot in the opening. The ring is the escrow
 * that holds the money; the dot is the money moving out by the contract's rules. White on the accent colour,
 * in the same rounded square as WayHand. The same drawing is `app/icon.svg` (the browser tab icon); keep them
 * in step.
 */
export function LogoMark({ size = 32 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
            <rect width="32" height="32" rx="9" fill="var(--color-accent-fill)" />
            <path
                d="M23.73 13.93A8 8 0 1 1 18.07 8.27"
                fill="none"
                stroke="#fff"
                strokeWidth="3.2"
                strokeLinecap="round"
            />
            <circle cx="21.66" cy="10.34" r="2.6" fill="#fff" />
        </svg>
    );
}

/** Mark and name together, for the top left of every page. `tagline` adds the small line under the name. */
export function Logo({ tagline }: { tagline?: string }) {
    return (
        <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
            <LogoMark />
            <span className="flex min-w-0 flex-col leading-none">
                <span className="font-display text-[20px] font-bold tracking-[0.06em] text-ink">OPUS</span>
                {tagline !== undefined && (
                    <span className="mt-1 hidden truncate text-[11px] font-medium text-muted sm:block">{tagline}</span>
                )}
            </span>
        </span>
    );
}
