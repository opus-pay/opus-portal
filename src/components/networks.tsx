"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

import type { MessageKey } from "../lib/i18n";
import { explorerAddress, NETWORKS, USDC_SOURCE, type Network } from "../lib/networks";
import { addNetwork, addUsdc, switchNetwork, type ActionResult, type Eip1193 } from "../lib/wallet-actions";
import { Frame } from "./frame";
import { useLocale } from "./locale";

const STATUS: Record<ActionResult, MessageKey> = {
    ok: "network.status.ok",
    rejected: "network.status.rejected",
    unsupported: "network.status.unsupported",
    failed: "network.status.failed",
};

const secondary =
    "inline-flex h-10 items-center justify-center rounded-lg border border-line bg-surface px-3 text-[14px] font-semibold text-ink hover:border-ink-soft disabled:opacity-60";
const primary =
    "inline-flex h-10 items-center justify-center rounded-lg bg-accent-fill px-3 text-[14px] font-bold text-white hover:bg-accent-deep disabled:opacity-60";

/** A value with a copy button. Clipboard access can be refused (a private window), so it fails quietly. */
function Copyable({ value, label }: { value: string; label: string }) {
    const { t } = useLocale();
    const [done, setDone] = useState(false);
    return (
        <span className="flex min-w-0 items-center gap-2">
            <span className="min-w-0 break-all font-mono text-[13.5px] text-ink">{value}</span>
            <button
                type="button"
                aria-label={`${t("network.copy")}: ${label}`}
                className="shrink-0 rounded-md border border-line px-2 py-0.5 text-[12.5px] font-medium text-ink-soft hover:border-ink-soft"
                onClick={() => {
                    void navigator.clipboard
                        ?.writeText(value)
                        .then(() => {
                            setDone(true);
                            setTimeout(() => setDone(false), 1500);
                        })
                        .catch(() => undefined);
                }}
            >
                {done ? t("network.copied") : t("network.copy")}
            </button>
        </span>
    );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-0.5 border-t border-line py-2.5 first:border-t-0 sm:flex-row sm:items-start sm:gap-4">
            <dt className="shrink-0 text-[13.5px] font-medium text-muted sm:w-44">{label}</dt>
            <dd className="m-0 min-w-0 text-[14.5px] text-ink">{children}</dd>
        </div>
    );
}

function NetworkCard({
    network,
    provider,
    current,
}: {
    network: Network;
    provider: () => Promise<Eip1193 | undefined>;
    current: boolean;
}) {
    const { t } = useLocale();
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState<MessageKey | null>(null);

    const run = async (action: (p: Eip1193, n: Network) => Promise<ActionResult>) => {
        setBusy(true);
        setStatus(null);
        try {
            const p = await provider();
            setStatus(p === undefined ? "network.status.noWallet" : STATUS[await action(p, network)]);
        } catch {
            setStatus("network.status.failed");
        } finally {
            setBusy(false);
        }
    };

    return (
        <section
            aria-labelledby={`net-${network.id}`}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-6"
        >
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 id={`net-${network.id}`} className="m-0 font-display text-[21px] font-bold">
                    {network.name}
                </h3>
                <span
                    className={`rounded-full px-2.5 py-0.5 text-[12.5px] font-bold ${
                        network.testnet ? "bg-sunken text-muted" : "bg-money-wash text-money-ink"
                    }`}
                >
                    {network.testnet ? t("network.testnet") : t("network.mainnet")}
                </span>
            </div>
            {current && <p className="m-0 text-[14px] font-semibold text-money-ink">✓ {t("network.current")}</p>}
            {network.testnet && <p className="m-0 text-[14px] text-muted">{t("network.testnet.note")}</p>}

            <div className="flex flex-wrap gap-2">
                <button type="button" className={primary} disabled={busy} onClick={() => void run(addNetwork)}>
                    {t("network.action.add")}
                </button>
                <button type="button" className={secondary} disabled={busy} onClick={() => void run(switchNetwork)}>
                    {t("network.action.switch")}
                </button>
                <button type="button" className={secondary} disabled={busy} onClick={() => void run(addUsdc)}>
                    {t("network.action.usdc")}
                </button>
            </div>
            <p role="status" aria-live="polite" className="m-0 min-h-[1.25rem] text-[14px] text-ink-soft">
                {status !== null && t(status)}
            </p>

            <dl className="m-0">
                <Row label={t("network.field.chainId")}>
                    <Copyable value={String(network.chainId)} label={t("network.field.chainId")} />
                </Row>
                <Row label={t("network.field.currency")}>
                    {network.currency.symbol} ({network.currency.decimals} {t("network.field.decimals")})
                </Row>
                <Row label={t("network.field.rpc")}>
                    {network.rpcUrls.map((url) => (
                        <Copyable key={url} value={url} label={t("network.field.rpc")} />
                    ))}
                </Row>
                <Row label={t("network.field.explorer")}>
                    <a href={network.explorer} target="_blank" rel="noopener noreferrer" className="break-all">
                        {network.explorer}
                    </a>
                </Row>
                <Row label={t("network.field.usdc")}>
                    <Copyable value={network.usdc.address} label={t("network.field.usdc")} />
                    <a
                        href={explorerAddress(network, network.usdc.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-[13.5px]"
                    >
                        {t("network.field.explorer")} ↗
                    </a>
                    <span className="mt-1 block text-[13.5px] text-muted">
                        {network.usdc.symbol} · {network.usdc.decimals} {t("network.field.decimals")}
                    </span>
                    {network.lookalike !== undefined && (
                        <span className="mt-1 block text-[13.5px] font-semibold text-warn">
                            {t("network.lookalike", {
                                symbol: network.lookalike.symbol,
                                address: network.lookalike.address,
                            })}
                        </span>
                    )}
                </Row>
            </dl>

            {network.faucets.length > 0 && (
                <div className="flex flex-col gap-1.5">
                    <h4 className="m-0 text-[15px] font-bold">{t("network.faucet.title")}</h4>
                    <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[14.5px]">
                        {network.faucets.map((f) => (
                            <li key={f.href}>
                                <a href={f.href} target="_blank" rel="noopener noreferrer">
                                    {t(f.label)} ↗
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex flex-col gap-1.5">
                <h4 className="m-0 text-[15px] font-bold">{t("network.contracts.title")}</h4>
                {network.contracts === null ? (
                    <p className="m-0 text-[14px] text-muted">{t("network.contracts.none")}</p>
                ) : (
                    <>
                        {network.testnet && (
                            <p className="m-0 text-[13.5px] text-muted">{t("network.contracts.test")}</p>
                        )}
                        <dl className="m-0">
                            {(Object.keys(network.contracts) as (keyof NonNullable<Network["contracts"]>)[]).map(
                                (key) => (
                                    <Row key={key} label={t(`network.contract.${key}` as MessageKey)}>
                                        <Copyable
                                            value={network.contracts![key]}
                                            label={t(`network.contract.${key}` as MessageKey)}
                                        />
                                    </Row>
                                )
                            )}
                        </dl>
                    </>
                )}
            </div>
        </section>
    );
}

/** Network settings and the USDC token for a wallet, with buttons to add them, switch, and add the token. */
export function Networks() {
    const { t } = useLocale();
    const { connector, chainId } = useAccount();

    /** The connected wallet's provider; else the browser's own wallet; else nothing. */
    const provider = async (): Promise<Eip1193 | undefined> => {
        if (connector !== undefined) return (await connector.getProvider()) as Eip1193;
        return (window as unknown as { ethereum?: Eip1193 }).ethereum;
    };

    // Test networks only hold play money: they stay out of sight until someone asks for them.
    const [showTest, setShowTest] = useState(false);
    const real = NETWORKS.filter((network) => !network.testnet);
    const test = NETWORKS.filter((network) => network.testnet);

    return (
        <Frame>
            <main className="mx-auto flex w-full max-w-[64rem] flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
                <section className="flex max-w-[46rem] flex-col gap-3">
                    <h1 className="m-0 font-display text-[28px] font-bold leading-tight tracking-tight text-balance sm:text-[36px]">
                        {t("network.title")}
                    </h1>
                    <p className="m-0 text-[16px] leading-relaxed text-ink-soft">{t("network.intro")}</p>
                </section>

                <section className="flex flex-col gap-2 rounded-2xl border-2 border-accent bg-accent-wash p-5">
                    <h2 className="m-0 font-display text-[18px] font-bold">{t("network.pol.title")}</h2>
                    <p className="m-0 text-[15px] leading-relaxed text-ink-soft">{t("network.pol.body")}</p>
                    <a href="/guide/" className="text-[14.5px] font-semibold">
                        {t("network.pol.guide")} →
                    </a>
                </section>

                <div className="flex flex-col gap-6">
                    {real.map((network) => (
                        <NetworkCard
                            key={network.id}
                            network={network}
                            provider={provider}
                            current={chainId === network.chainId}
                        />
                    ))}
                    {test.length > 0 && (
                        <button
                            type="button"
                            className={`${secondary} self-start`}
                            aria-expanded={showTest}
                            aria-controls="test-networks"
                            onClick={() => setShowTest(!showTest)}
                        >
                            {t(showTest ? "network.testnet.hide" : "network.testnet.show")}
                        </button>
                    )}
                    {showTest && (
                        <div id="test-networks" className="flex flex-col gap-6">
                            {test.map((network) => (
                                <NetworkCard
                                    key={network.id}
                                    network={network}
                                    provider={provider}
                                    current={chainId === network.chainId}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <section className="flex flex-col gap-1.5 text-[13.5px] leading-relaxed text-muted">
                    <p className="m-0">
                        {t("network.verify")}{" "}
                        <a href={USDC_SOURCE} target="_blank" rel="noopener noreferrer">
                            {t("network.verify.link")} ↗
                        </a>
                    </p>
                    <p className="m-0">{t("network.disclaimer")}</p>
                </section>
            </main>
        </Frame>
    );
}
