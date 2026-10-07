import { expect } from "chai";
import { getAddress } from "viem";

import { MESSAGES, LOCALES } from "../src/lib/i18n";
import {
    addChainRequest,
    explorerAddress,
    hexChainId,
    isUnsupportedChain,
    NETWORKS,
    networkOf,
    switchChainRequest,
    watchUsdcRequest,
} from "../src/lib/networks";
import { addNetwork, addUsdc, classify, switchNetwork, type Eip1193 } from "../src/lib/wallet-actions";

const [mainnet, amoy] = NETWORKS;

/** A wallet that answers each method with the next reply (a value, or an error with a code). */
function fakeWallet(replies: Record<string, unknown[]>) {
    const calls: { method: string; params: unknown }[] = [];
    const provider: Eip1193 = {
        async request(args) {
            calls.push(args);
            const next = (replies[args.method] ?? []).shift();
            if (next instanceof Error) throw next;
            return next ?? null;
        },
    };
    return { provider, calls };
}
const coded = (code: number) => Object.assign(new Error(`code ${code}`), { code });

describe("network information", () => {
    it("lists Polygon and Polygon Amoy, the two chains the wallet config (src/lib/wagmi.ts) knows", () => {
        expect(NETWORKS.map((n) => n.chainId)).to.deep.equal([137, 80002]);
        expect(NETWORKS.map((n) => n.testnet)).to.deep.equal([false, true]);
    });

    it("keeps every address in its checksum spelling, https links, and 18/6 decimals", () => {
        for (const n of NETWORKS) {
            expect(getAddress(n.usdc.address), n.id).to.equal(n.usdc.address);
            expect(n.usdc.decimals).to.equal(6);
            expect(n.currency.decimals).to.equal(18);
            for (const url of [...n.rpcUrls, n.explorer, ...n.faucets.map((f) => f.href)]) {
                expect(new URL(url).protocol, url).to.equal("https:");
            }
            for (const address of Object.values(n.contracts ?? {})) {
                expect(getAddress(address), `${n.id} ${address}`).to.equal(address);
            }
            if (n.lookalike) expect(getAddress(n.lookalike.address)).to.equal(n.lookalike.address);
        }
        // the lookalike must never be the token we tell people to use
        expect(mainnet.lookalike?.address).to.not.equal(mainnet.usdc.address);
        // nothing is deployed on the main network yet, so the page says so
        expect(mainnet.contracts).to.equal(null);
        expect(amoy.contracts?.factory).to.equal("0x8Cae2EBe1b3D13e3EAf9Fc765a577dc30c6a5218");
    });

    it("builds the three wallet requests (EIP-3085, EIP-3326, EIP-747)", () => {
        expect(hexChainId(137)).to.equal("0x89");
        expect(hexChainId(80002)).to.equal("0x13882");
        expect(addChainRequest(mainnet)).to.deep.equal({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: "0x89",
                    chainName: "Polygon",
                    nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
                    rpcUrls: ["https://polygon-rpc.com"],
                    blockExplorerUrls: ["https://polygonscan.com"],
                },
            ],
        });
        expect(switchChainRequest(amoy)).to.deep.equal({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x13882" }],
        });
        expect(watchUsdcRequest(mainnet)).to.deep.equal({
            method: "wallet_watchAsset",
            params: { type: "ERC20", options: { address: mainnet.usdc.address, symbol: "USDC", decimals: 6 } },
        });
        expect(explorerAddress(amoy, amoy.usdc.address)).to.equal(
            `https://amoy.polygonscan.com/address/${amoy.usdc.address}`
        );
    });

    it("explains in every language, the POL need and the look-alike warning with its slots", () => {
        for (const locale of LOCALES) {
            const m = MESSAGES[locale];
            expect(m["network.pol.body"], locale).to.contain("POL");
            expect(m["network.lookalike"], locale).to.contain("{symbol}").and.to.contain("{address}");
        }
    });
});

describe("wallet actions", () => {
    it("adds a network, and asks the wallet to show the USDC", async () => {
        const { provider, calls } = fakeWallet({});
        expect(await addNetwork(provider, mainnet)).to.equal("ok");
        expect(await addUsdc(provider, mainnet)).to.equal("ok");
        expect(calls.map((c) => c.method)).to.deep.equal(["wallet_addEthereumChain", "wallet_watchAsset"]);
    });

    it("treats a refusal as rejected, and a wallet that lacks the method as unsupported", async () => {
        expect(await addNetwork(fakeWallet({ wallet_addEthereumChain: [coded(4001)] }).provider, mainnet)).to.equal(
            "rejected"
        );
        expect(await addUsdc(fakeWallet({ wallet_watchAsset: [false] }).provider, mainnet)).to.equal("rejected");
        expect(await addNetwork(fakeWallet({ wallet_addEthereumChain: [coded(4200)] }).provider, mainnet)).to.equal(
            "unsupported"
        );
        expect(
            await addNetwork(fakeWallet({ wallet_addEthereumChain: [new Error("boom")] }).provider, mainnet)
        ).to.equal("failed");
        expect(classify(null)).to.equal("failed");
        expect(classify({ code: "ACTION_REJECTED" })).to.equal("rejected");
    });

    it("switches, and adds the network first when the wallet does not know it (4902)", async () => {
        const known = fakeWallet({});
        expect(await switchNetwork(known.provider, mainnet)).to.equal("ok");
        expect(known.calls).to.have.length(1);
        const unknown = fakeWallet({ wallet_switchEthereumChain: [coded(4902)] });
        expect(await switchNetwork(unknown.provider, amoy)).to.equal("ok");
        expect(unknown.calls.map((c) => c.method)).to.deep.equal([
            "wallet_switchEthereumChain",
            "wallet_addEthereumChain",
        ]);
        expect(
            await switchNetwork(fakeWallet({ wallet_switchEthereumChain: [coded(4001)] }).provider, mainnet)
        ).to.equal("rejected");
    });
});

describe("the wrong-network warning", () => {
    it("warns for any chain except Polygon and Polygon Amoy, and for nothing when there is no chain", () => {
        expect(isUnsupportedChain(137)).to.equal(false);
        expect(isUnsupportedChain(80002)).to.equal(false);
        for (const other of [1, 56, 10, 8453, 42161, 31337, 80001]) {
            expect(isUnsupportedChain(other), String(other)).to.equal(true);
        }
        expect(isUnsupportedChain(undefined)).to.equal(false);
        expect(networkOf(137)?.name).to.equal("Polygon");
        expect(networkOf(1)).to.equal(undefined);
    });

    it("says in every language what is wrong and keeps the chain id slot", () => {
        for (const locale of LOCALES) {
            const m = MESSAGES[locale];
            expect(m["network.warn.text"], locale).to.contain("{chainId}").and.to.contain("Polygon");
        }
    });
});
