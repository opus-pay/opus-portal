# opus-portal

English · [한국어](README.ko.md)

**OPUS Portal** is a site that gathers the services built on OPUS escrow. It only lists them: it **does not connect people and does not hold money** (decision D24).

```
┌──────────────────────────────────────────────┐
│ OPUS                           [Language]    │  ← top
├──────────────────────────────────────────────┤
│                                              │
│   Services built on OPUS                     │
│   ┌────────┐ ┌────────┐ ┌────────┐           │  ← middle: services
│   │WayHand │ │OPUS    │ │OPUS    │           │     WayHand is a link,
│   │ Open   │ │Tour    │ │Code    │           │     the other two are coming
│   └────────┘ └────────┘ └────────┘           │     soon (not selectable)
│                                              │
├──────────────────────────────────────────────┤
│        Architecture   GitHub                 │  ← bottom: links
└──────────────────────────────────────────────┘
```

It is a static site (`next build` produces `out/`). It has no server code, so it can hold no keys or user data, and it can be put on any file host or an IPFS mirror (ROADMAP #66).

## Run it

```bash
yarn install
cp .env.sample .env.local     # fill in the values
yarn dev                      # http://localhost:3200
yarn test && yarn lint && yarn formatting:check
yarn build                    # out/
```

Node 22 or later is required.

## Where it is hosted (www.opusportal.org)

Because it is a static site (`out/`) with no server code, any host works. The address is `https://www.opusportal.org`. Below is an example on Cloudflare Pages.

1.  In Cloudflare Pages, connect this repository, set the build command to `yarn build`, the output folder to `out` and the Node version to 22.
2.  Put `NEXT_PUBLIC_SITE_URL=https://www.opusportal.org` in the build environment variables.
3.  Add `www.opusportal.org` as a custom domain of the Pages project (if Cloudflare manages the DNS, the record is made for you).
4.  Make a redirect rule (301) from `opusportal.org` (without www) to `https://www.opusportal.org`. If you registered `opusescrow.org`, send it the same way.

If the address changes, change it too in the shared UI kit (`DEFAULT_PORTAL_URL`) and in the services that use the Portal address as their default (for example WayHand's `NEXT_PUBLIC_PORTAL_URL`).

## Settings (`.env.local`, read at build time, not secret)

| Setting                   | Meaning                                                               |
| :------------------------ | :-------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | The address of this site (shown in the wallet)                        |
| `NEXT_PUBLIC_WAYHAND_URL` | The address of WayHand. Empty means `https://www.wayhand.app`.        |
| `NEXT_PUBLIC_GITHUB_URL`  | The GitHub link at the bottom (default `https://github.com/opus-pay`) |

## Where to change what

| To do this                                                  | File                                                                                                                                                                                                                               |
| :---------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add or open a service                                       | One line in `src/lib/services.ts` (the name is a brand, so it is not translated); the description in `src/lib/i18n.ts` (all four languages)                                                                                        |
| Turn a service to "open"                                    | `status: "active"` and an address (`href`). If the address is not http(s) (a `#` counts), it does not open.                                                                                                                        |
| Text                                                        | `src/lib/i18n.ts` (en/ko/ja/zh must have the same keys and the same `{slots}`; a test checks it)                                                                                                                                   |
| The links at the bottom                                     | `src/lib/links.ts`                                                                                                                                                                                                                 |
| Network and USDC information, the add-to-wallet buttons     | `app/network`, `src/components/networks.tsx`, `src/lib/networks.ts` (network and address values), `src/lib/wallet-actions.ts` (wallet requests). Check address values against official sources and write them in checksum spelling |
| The deposit and withdrawal guide (exchange links, pictures) | `app/guide`, `src/components/guide.tsx`, `src/lib/guide.ts` (exchanges, steps); the text is `guide.*`, `flow.*` and `arrow.*` in `i18n.ts`                                                                                         |

## About wallets

-   **The Portal has no wallet connection.** It asks for no signature and no transaction, and does not see an address. Connecting a wallet is done in a service such as WayHand. (The buttons on the network page ask **the browser's own wallet** (`window.ethereum`) to add or switch a network and to show USDC only when the user presses them; no money moves. Where there is no wallet, such as an ordinary phone browser, the button only explains, and the values can be copied by hand.)
-   The chains are Polygon and Polygon Amoy.

## How a service gets listed

**Only by contact and agreement (D23, decided 2026-10-07).** Neither reading services from the chain automatically nor letting anyone register is used. An open registry cannot stop spam, fakes that copy a real service, or scams.

1. The service contacts the operator (there is no contact button on the screen).
2. The operator checks who runs it, its instance address and what it does, and agrees terms.
3. A pull request adds the agreed service as one entry in `src/lib/services.ts`. Every change stays in the public record.
4. A service can ask for a change or removal, and the operator may take a service down under the display policy (#66).

## Principles

-   **Neutral:** it lists services, sells no ranking and pins no team service (ROADMAP #63). The display policy and handling of reports are set in #66.
-   **A service that is not open yet cannot be selected.** It takes no focus, no click and no text selection, and a screen reader reads it as "not published yet".
-   **The architecture is a document inside this site** (`/architecture/`): nine sections that open when you press the title, and six sequence diagrams. The text is in `src/lib/architecture-text.ts` (four languages) and the structure in `src/lib/architecture.ts`. The whitepaper link is left out for now.
-   **The guide pages** show only the important things first (the Polygon warning, what a wallet needs); the rest opens when you press the title.

## Not done yet

The listing terms and display policy (#62, #66), on-chain statistics for registered services (#63), my jobs (#64), the evaluator and arbiter list (#65), the display policy and an IPFS mirror (#66). For now it is a first screen with the list written in code.

## License

MIT. See [LICENSE](LICENSE).
