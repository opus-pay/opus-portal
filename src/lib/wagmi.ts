import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { polygon, polygonAmoy } from "wagmi/chains";

/**
 * Phone wallets (WalletConnect) are on only when a project id is set; make one for free at cloud.reown.com.
 * Without it only the browser wallet is offered. The Portal never sends a transaction: connecting shows who the
 * visitor is, and later pages (their jobs across services) read the chain for that address.
 */
const PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";
export const PHONE_WALLET = PROJECT_ID !== "";

export const wagmiConfig = createConfig({
    chains: [polygon, polygonAmoy],
    connectors: PHONE_WALLET
        ? [
              injected(),
              walletConnect({
                  projectId: PROJECT_ID,
                  showQrModal: true,
                  metadata: {
                      name: "OPUS Portal",
                      description: "Services built on OPUS escrow",
                      url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3200",
                      icons: [],
                  },
              }),
          ]
        : [injected()],
    ssr: true,
    transports: { [polygon.id]: http(), [polygonAmoy.id]: http() },
});
