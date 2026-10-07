"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

import { isUnsupportedChain, NETWORKS } from "../lib/networks";
import { switchNetwork, type Eip1193 } from "../lib/wallet-actions";
import { useLocale } from "./locale";

/**
 * A bar under the header, on every page, when the connected wallet is on a network OPUS does not use. Money sent
 * on the wrong network can be lost, so it says so and offers a one-click switch to Polygon (or the test network).
 * It shows nothing when no wallet is connected or the wallet is on Polygon or Polygon Amoy.
 */
export function NetworkWarning() {
    const { t } = useLocale();
    const { isConnected, chainId, connector } = useAccount();
    const [failed, setFailed] = useState(false);
    if (!isConnected || !isUnsupportedChain(chainId)) return null;

    const go = async (id: "polygon" | "amoy") => {
        setFailed(false);
        const network = NETWORKS.find((n) => n.id === id)!;
        try {
            const provider = (await connector?.getProvider()) as Eip1193 | undefined;
            if (provider === undefined || (await switchNetwork(provider, network)) !== "ok") setFailed(true);
        } catch {
            setFailed(true);
        }
    };

    return (
        <div role="alert" className="border-b border-warn bg-warn-wash">
            <div className="mx-auto flex w-full max-w-[64rem] flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
                <p className="m-0 flex-1 text-[14px] font-semibold leading-snug text-warn">
                    {t("network.warn.text", { chainId: chainId ?? 0 })}
                    {failed && <span className="ml-1 font-normal">{t("network.status.failed")}</span>}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        className="inline-flex h-9 items-center rounded-lg bg-accent-fill px-3 text-[13.5px] font-bold text-white hover:bg-accent-deep"
                        onClick={() => void go("polygon")}
                    >
                        {t("network.warn.switch")}
                    </button>
                    <button
                        type="button"
                        className="inline-flex h-9 items-center rounded-lg border border-line bg-surface px-3 text-[13.5px] font-semibold text-ink hover:border-ink-soft"
                        onClick={() => void go("amoy")}
                    >
                        {t("network.warn.amoy")}
                    </button>
                    <a href="/network/" className="text-[13.5px] font-semibold">
                        {t("network.warn.more")} →
                    </a>
                </div>
            </div>
        </div>
    );
}
