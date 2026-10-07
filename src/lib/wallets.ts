import { getAddress, isAddress } from "viem";

/** Which way to reach a wallet: the browser's own (an extension, or a wallet app's browser) or a phone wallet over WalletConnect. */
export type WalletKind = "browser" | "phone";

type Pick = { id: string };

/** The connector for a wanted kind, or `undefined` when this site cannot offer it. */
export function chooseConnector<T extends Pick>(
    connectors: readonly T[],
    options: { hasBrowserWallet: boolean; kind: WalletKind }
): T | undefined {
    if (options.kind === "phone") return connectors.find((c) => c.id === "walletConnect");
    return options.hasBrowserWallet ? connectors.find((c) => c.id !== "walletConnect") : undefined;
}

/** Whether this browser has a wallet of its own: an extension, or the page is open inside a wallet app. */
export function hasBrowserWallet(): boolean {
    return typeof window !== "undefined" && (window as unknown as { ethereum?: unknown }).ethereum !== undefined;
}

/**
 * An address as it is shown everywhere in OPUS (the Portal, WayHand and the wallet app): the EIP-55 checksum
 * spelling, so the same address never looks different from one screen to the next. Text that is not an address
 * is returned as it is.
 */
export function displayAddress(address: string): string {
    return isAddress(address, { strict: false }) ? getAddress(address) : address;
}

/** `0x1234…abcd` for showing an address in a small space: the first 6 and last 4 characters of the checksum form. */
export function shortAddress(address: string): string {
    const full = displayAddress(address);
    return full.length <= 12 ? full : `${full.slice(0, 6)}…${full.slice(-4)}`;
}
