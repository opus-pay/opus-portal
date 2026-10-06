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

/** `0x1234…abcd` for showing an address in a small space. */
export function shortAddress(address: string): string {
    return address.length <= 12 ? address : `${address.slice(0, 6)}…${address.slice(-4)}`;
}
