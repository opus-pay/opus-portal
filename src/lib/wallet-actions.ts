import { addChainRequest, switchChainRequest, watchUsdcRequest, type Network, type WalletRequest } from "./networks";

/** What a wallet's `window.ethereum` or a WalletConnect provider offers. */
export type Eip1193 = { request(args: WalletRequest): Promise<unknown> };

export type ActionResult = "ok" | "rejected" | "unsupported" | "failed";

/** Maps a wallet's refusal to something the page can explain. 4001 is "the user said no", 4200 "not supported". */
export function classify(error: unknown): ActionResult {
    const code = typeof error === "object" && error !== null ? (error as { code?: unknown }).code : undefined;
    if (code === 4001 || code === "ACTION_REJECTED") return "rejected";
    if (code === 4200 || code === -32601) return "unsupported";
    return "failed";
}

async function run(provider: Eip1193, request: WalletRequest): Promise<ActionResult> {
    try {
        const answer = await provider.request(request);
        // wallet_watchAsset answers false when the wallet declines without an error.
        return answer === false ? "rejected" : "ok";
    } catch (error) {
        return classify(error);
    }
}

/** Adds the network to the wallet. Switching to it is the wallet's choice. */
export const addNetwork = (provider: Eip1193, n: Network) => run(provider, addChainRequest(n));

/** Shows the network's USDC in the wallet. */
export const addUsdc = (provider: Eip1193, n: Network) => run(provider, watchUsdcRequest(n));

/**
 * Switches to the network. A wallet that does not have it answers 4902: then the network is added, which in most
 * wallets also switches to it.
 */
export async function switchNetwork(provider: Eip1193, n: Network): Promise<ActionResult> {
    try {
        await provider.request(switchChainRequest(n));
        return "ok";
    } catch (error) {
        const code = typeof error === "object" && error !== null ? (error as { code?: unknown }).code : undefined;
        if (code === 4902) return addNetwork(provider, n);
        return classify(error);
    }
}
