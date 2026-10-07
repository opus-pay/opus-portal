"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { polygon, polygonAmoy } from "wagmi/chains";

import { PHONE_WALLET } from "../lib/wagmi";
import { chooseConnector, displayAddress, hasBrowserWallet, shortAddress, type WalletKind } from "../lib/wallets";
import { useLocale } from "./locale";

const buttonClass =
    "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-accent-fill px-2.5 text-[14px] font-bold text-white sm:px-4 sm:text-[14.5px] hover:bg-accent-deep disabled:opacity-60";

const NETWORKS: Record<number, string> = { [polygon.id]: "Polygon", [polygonAmoy.id]: "Polygon Amoy" };

/**
 * "Connect wallet" in the top bar. With a browser wallet and WalletConnect both on, a small menu lets the visitor
 * pick one; with only one it connects at once. Once connected it shows the address and a way to disconnect.
 * Connecting only reveals the address: the Portal asks for no signature and sends no transaction.
 */
export function WalletButton() {
    const { t } = useLocale();
    const { address, chainId, isConnected } = useAccount();
    const { connect, connectors, isPending, error } = useConnect();
    const { disconnect } = useDisconnect();
    // The wallet in the browser is only known after the page loads, so the choice is made on the client.
    const [browser, setBrowser] = useState(false);
    const [open, setOpen] = useState(false);
    const menu = useRef<HTMLDivElement>(null);
    useEffect(() => setBrowser(hasBrowserWallet()), []);
    // A failed connection is explained in the menu, where the visitor is already looking.
    useEffect(() => {
        if (error !== null) setOpen(true);
    }, [error]);
    useEffect(() => {
        if (!open) return;
        const close = (event: MouseEvent) => {
            if (menu.current !== null && !menu.current.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [open]);

    if (isConnected && address !== undefined) {
        const network = chainId === undefined ? undefined : NETWORKS[chainId];
        return (
            <div className="flex items-center gap-2" aria-label={t("wallet.connected")}>
                <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-[14px] font-medium">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-money" />
                    <span className="font-mono" title={displayAddress(address)}>
                        {shortAddress(address)}
                    </span>
                    {network !== undefined && <span className="hidden text-muted sm:inline">{network}</span>}
                </span>
                <button
                    type="button"
                    className="h-10 rounded-lg border border-line bg-surface px-3 text-[14px] font-medium text-ink-soft hover:border-ink-soft"
                    onClick={() => disconnect()}
                >
                    {t("wallet.disconnect")}
                </button>
            </div>
        );
    }

    const kinds: WalletKind[] = [];
    if (browser) kinds.push("browser");
    if (PHONE_WALLET) kinds.push("phone");
    const start = (kind: WalletKind) => {
        const connector = chooseConnector(connectors, { hasBrowserWallet: browser, kind });
        setOpen(false);
        if (connector !== undefined) connect({ connector });
    };

    return (
        <div className="relative" ref={menu}>
            <button
                type="button"
                className={buttonClass}
                disabled={isPending}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => (kinds.length === 1 && error === null ? start(kinds[0]) : setOpen((value) => !value))}
            >
                {isPending ? t("wallet.connecting") : t("wallet.connect")}
            </button>
            {open && (
                <div
                    role="menu"
                    className="absolute right-0 z-10 mt-2 w-64 overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
                >
                    {error !== null && (
                        <p className="m-0 border-b border-line p-3 text-[13.5px] text-warn">{t("wallet.failed")}</p>
                    )}
                    {kinds.length === 0 ? (
                        <p className="m-0 p-3 text-[14px] text-muted">{t("wallet.none")}</p>
                    ) : (
                        kinds.map((kind) => (
                            <button
                                key={kind}
                                type="button"
                                role="menuitem"
                                className="block w-full px-4 py-3 text-left text-[14.5px] font-medium text-ink hover:bg-sunken"
                                onClick={() => start(kind)}
                            >
                                {t(kind === "browser" ? "wallet.browser" : "wallet.phone")}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
