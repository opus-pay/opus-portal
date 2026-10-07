import type { MessageKey } from "./i18n";

/**
 * The networks OPUS runs on, and what a wallet needs to know about each: how to reach it, its coin, its block
 * explorer and the USDC token. The values are public. Check them against the official sources before relying on
 * them (for USDC, Circle's own list of contract addresses): a wrong address here would send people to the wrong token.
 */
export type NetworkId = "polygon" | "amoy";

export type Network = {
    id: NetworkId;
    name: string;
    chainId: number;
    testnet: boolean;
    currency: { name: string; symbol: string; decimals: number };
    rpcUrls: readonly string[];
    explorer: string;
    usdc: { name: string; symbol: string; decimals: number; address: string };
    /** A different token with a similar name that people send by mistake. Shown as "not this one". */
    lookalike?: { symbol: string; address: string };
    /** OPUS contracts on this network; `null` when nothing is deployed yet. */
    contracts: Record<"factory" | "instance" | "evaluator" | "forwarder", string> | null;
    faucets: readonly { label: MessageKey; href: string }[];
};

export const NETWORKS: readonly Network[] = [
    {
        id: "polygon",
        name: "Polygon",
        chainId: 137,
        testnet: false,
        currency: { name: "POL", symbol: "POL", decimals: 18 },
        rpcUrls: ["https://polygon-rpc.com"],
        explorer: "https://polygonscan.com",
        usdc: { name: "USD Coin", symbol: "USDC", decimals: 6, address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" },
        lookalike: { symbol: "USDC.e (USDC PoS)", address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" },
        contracts: null,
        faucets: [],
    },
    {
        id: "amoy",
        name: "Polygon Amoy",
        chainId: 80002,
        testnet: true,
        currency: { name: "POL", symbol: "POL", decimals: 18 },
        rpcUrls: ["https://rpc-amoy.polygon.technology"],
        explorer: "https://amoy.polygonscan.com",
        usdc: { name: "USD Coin", symbol: "USDC", decimals: 6, address: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582" },
        contracts: {
            factory: "0xeafFF7cCe71b66dB91c40d09640ae9ae854707ca",
            instance: "0x7632d054BfE635A1f0394fbcd74678B6567213Fd",
            evaluator: "0x65819D9199144a66EC17Ad39da6bebabc3eEF585",
            forwarder: "0x2042172c8b638f1720A1c468726dbd167d62E63f",
        },
        faucets: [
            { label: "network.faucet.pol", href: "https://faucet.polygon.technology" },
            { label: "network.faucet.usdc", href: "https://faucet.circle.com" },
        ],
    },
];

/** Where Circle lists the official USDC contract address of each network. */
export const USDC_SOURCE = "https://developers.circle.com/stablecoins/usdc-contract-addresses";

export const hexChainId = (chainId: number): string => `0x${chainId.toString(16)}`;

export type WalletRequest = { method: string; params: unknown };

/** EIP-3085: asks the wallet to add the network. */
export function addChainRequest(n: Network): WalletRequest {
    return {
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: hexChainId(n.chainId),
                chainName: n.name,
                nativeCurrency: n.currency,
                rpcUrls: [...n.rpcUrls],
                blockExplorerUrls: [n.explorer],
            },
        ],
    };
}

/** EIP-3326: asks the wallet to switch to a network it already has. */
export function switchChainRequest(n: Network): WalletRequest {
    return { method: "wallet_switchEthereumChain", params: [{ chainId: hexChainId(n.chainId) }] };
}

/** EIP-747: asks the wallet to show the network's USDC. */
export function watchUsdcRequest(n: Network): WalletRequest {
    return {
        method: "wallet_watchAsset",
        params: {
            type: "ERC20",
            options: { address: n.usdc.address, symbol: n.usdc.symbol, decimals: n.usdc.decimals },
        },
    };
}

export const explorerAddress = (n: Network, address: string): string => `${n.explorer}/address/${address}`;

/** The network of a chain id, or undefined when OPUS does not run there. */
export const networkOf = (chainId: number | undefined): Network | undefined =>
    NETWORKS.find((n) => n.chainId === chainId);

/** A connected wallet on any chain other than Polygon or Polygon Amoy needs a warning. */
export const isUnsupportedChain = (chainId: number | undefined): boolean =>
    chainId !== undefined && networkOf(chainId) === undefined;
