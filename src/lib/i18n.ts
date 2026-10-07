export const LOCALES = ["en", "ko", "ja", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
    en: "English",
    ko: "한국어",
    ja: "日本語",
    zh: "中文",
};

export const isLocale = (value: unknown): value is Locale => (LOCALES as readonly unknown[]).includes(value);

/** The first language in the browser's list that the site has, else English. */
export function pickLocale(languages: readonly string[]): Locale {
    for (const tag of languages) {
        const base = tag.toLowerCase().split("-")[0];
        if (isLocale(base)) return base;
    }
    return "en";
}

const en = {
    "brand.tagline": "Services built on OPUS escrow",
    "nav.language": "Language",
    "wallet.connect": "Connect wallet",
    "wallet.connecting": "Connecting…",
    "wallet.disconnect": "Disconnect",
    "wallet.browser": "Browser wallet",
    "wallet.phone": "Phone wallet (WalletConnect)",
    "wallet.none": "No wallet found. Install a browser wallet, or use the site once WalletConnect is set up.",
    "wallet.connected": "Connected wallet",
    "wallet.failed": "Could not connect the wallet.",
    "hero.title": "Services built on OPUS",
    "hero.intro":
        "OPUS is an open escrow: money is locked in a contract and moves only by its rules. Each service below uses it in its own way. The Portal only lists them. It does not match people and it never holds money.",
    "services.title": "Services",
    "status.live": "Open",
    "status.planned": "Planned",
    "card.go": "Go to {name}",
    "card.planned": "{name}: not open yet",
    "service.wayhand.desc":
        "Errands abroad, paid through escrow. Ask someone in Japan or Korea to check a place or send documents, and pay when the work is done. Buying on your behalf is coming.",
    "service.class.desc": "1:1 global Korean conversation and K-culture video tutoring.",
    "service.asset.desc": "A direct marketplace for vertical short-form JSON prompts and style-specific art assets.",
    "service.studio.desc": "A multimedia studio that links scripts, AI dubbing and video rendering as divided work.",
    "service.tour.desc": "A local concierge for tailored itineraries and on-site bookings.",
    "service.code.desc": "Micro-bounties for local LLM setup and infrastructure troubleshooting.",
    "service.dub.desc": "Outsourced AI-based multilingual short-form translation and voice dubbing.",
    "service.biz.desc": "Remote multilingual customer-service management for overseas online shops and websites.",
    "service.rights.desc": "Escrow for transferring original software source code, and for copyright and licenses.",
    "footer.whitepaper": "Whitepaper",
    "footer.architecture": "Architecture",
    "footer.github": "GitHub",
    "footer.note":
        "The OPUS contracts are open source and have not been independently audited yet. Start with small amounts.",
    "nav.guide": "Guide: exchanges",
    "guide.home.title": "Move money in and out",
    "guide.home.desc":
        "How to bring USDC from an exchange into your wallet and send it back. You also need a little POL for network fees.",
    "guide.home.go": "Open the guide",
    "guide.title": "Deposit and withdraw with an exchange",
    "guide.intro":
        "To use OPUS services you need USDC in your wallet. This page shows how to bring USDC from an exchange into the OPUS app, and how to send it back.",
    "guide.need.title": "What you need in your wallet",
    "guide.need.usdc.title": "USDC",
    "guide.need.usdc.body": "The money you pay with and receive. Always the USDC on the Polygon network.",
    "guide.need.pol.title": "A little POL too",
    "guide.need.pol.body":
        "POL is the coin that pays the network fee on Polygon. A very small amount is usually enough for many transfers (about 1 US dollar's worth, though fees change). Without POL you cannot send USDC to another address, such as back to an exchange.",
    "guide.need.gasless":
        "Actions inside OPUS escrow can be sent without POL where the service supports it. Sending USDC to any other address, such as an exchange, always needs POL.",
    "guide.safety.title": "Before you send",
    "guide.safety.network":
        "Choose the Polygon network (also called Polygon PoS). Other networks, such as Ethereum, Tron or BNB Chain, can lose the money for good. If the exchange does not offer Polygon for USDC, do not use it for this.",
    "guide.safety.token": "Send USDC, not another token. Check the token name in the exchange and in the app.",
    "guide.safety.test":
        "Send a small test first. Compare the first and last characters of the address, then send the rest.",
    "guide.safety.final": "Transfers on a blockchain cannot be undone.",
    "guide.exchanges.title": "Exchanges",
    "guide.exchanges.note":
        "Examples only, not recommendations. The OPUS Portal has no tie to these companies and earns nothing from these links. Screens, supported networks and rules change; follow each exchange's own guide. Other exchanges and wallets work the same way.",
    "guide.exchange.open": "Open {name}",
    "guide.gate.desc": "An overseas exchange. You can withdraw to a wallet address of your own.",
    "guide.upbit.desc":
        "A Korean exchange where you buy with Korean won. Withdrawals go only to a personal wallet that you registered and verified first (for example MetaMask).",
    "guide.in.title": "Bring money in: exchange → OPUS app",
    "guide.in.gate": "From Gate.IO",
    "guide.in.upbit": "From Upbit (Korea)",
    "flow.exchange": "Exchange",
    "flow.exchange.sub": "Buy USDC and a little POL",
    "flow.upbit": "Upbit",
    "flow.upbit.sub": "Korean won → USDC and a little POL",
    "flow.registered": "Your registered wallet",
    "flow.registered.sub": "For example MetaMask, verified with Upbit",
    "flow.app": "OPUS app",
    "flow.app.sub": "Your wallet address (Receive screen)",
    "flow.service": "OPUS service",
    "flow.service.sub": "Pay into escrow, e.g. WayHand",
    "flow.deposit": "Exchange deposit address",
    "flow.deposit.sub": "USDC on Polygon",
    "arrow.withdraw": "Withdraw USDC + POL · Polygon network",
    "arrow.withdrawRegistered": "Withdraw to the registered wallet · Polygon network",
    "arrow.sendApp": "Send · Polygon · needs a little POL",
    "arrow.pay": "Pay with USDC",
    "arrow.sendBack": "Send USDC · Polygon · needs a little POL",
    "guide.gate.s1": "Sign up at Gate.IO and finish identity verification.",
    "guide.gate.s2": "Buy USDC, and also a small amount of POL.",
    "guide.gate.s3": "In the OPUS app, open Receive and copy your address.",
    "guide.gate.s4":
        "In Gate.IO, start a withdrawal. Choose USDC, the Polygon network, and paste your address. Do the same for POL.",
    "guide.gate.s5": "When it arrives, the app shows your USDC and POL balances. Check both.",
    "guide.upbit.s1":
        "In the Upbit app, register a personal wallet (for example MetaMask) and verify that it is yours. Upbit only allows withdrawals to registered addresses.",
    "guide.upbit.s2":
        "Buy USDC and a small amount of POL with Korean won. Check that Upbit lists them and offers the Polygon network for withdrawal.",
    "guide.upbit.s3": "Withdraw them to the registered wallet on the Polygon network.",
    "guide.upbit.s4": "In the OPUS app, open Receive and copy your address.",
    "guide.upbit.s5":
        "In MetaMask, switch to Polygon and send the USDC to your OPUS app address. The POL you withdrew pays the fee.",
    "guide.upbit.s6": "Check the balance in the OPUS app.",
    "guide.out.title": "Send money back: OPUS app → exchange",
    "guide.out.s1":
        "In the exchange, open the deposit screen for USDC, choose the Polygon network, and copy the deposit address.",
    "guide.out.s2": "In the OPUS app, open Send. Paste the address, enter a small test amount, and approve.",
    "guide.out.s3": "After the test arrives, send the rest. A little POL pays the fee.",
    "guide.out.s4":
        "Some exchanges accept deposits only from addresses you registered first, or ask about the sender. Follow the exchange's rules.",
    "guide.disclaimer":
        "This guide is general information, not financial or legal advice. Rules for exchanges and crypto assets differ by country.",
    "guide.polygon.banner":
        "Always choose the Polygon network. Every withdrawal and every deposit in this guide must be on Polygon. Any other network can lose your money for good.",
} as const;

export type MessageKey = keyof typeof en;

const ko: Record<MessageKey, string> = {
    "brand.tagline": "OPUS 에스크로 위의 서비스",
    "nav.language": "언어",
    "wallet.connect": "지갑 연결",
    "wallet.connecting": "연결하는 중…",
    "wallet.disconnect": "연결 끊기",
    "wallet.browser": "브라우저 지갑",
    "wallet.phone": "휴대폰 지갑 (WalletConnect)",
    "wallet.none": "지갑을 찾지 못했습니다. 브라우저 지갑을 설치하거나, WalletConnect가 설정된 뒤에 이용하세요.",
    "wallet.connected": "연결된 지갑",
    "wallet.failed": "지갑을 연결하지 못했습니다.",
    "hero.title": "OPUS 위에서 만든 서비스",
    "hero.intro":
        "OPUS는 열린 에스크로입니다. 돈은 컨트랙트에 잠기고 그 규칙에 따라서만 움직입니다. 아래 서비스는 저마다의 방식으로 OPUS를 씁니다. 포털은 서비스를 나열할 뿐 사람을 연결하지 않고 돈도 맡지 않습니다.",
    "services.title": "서비스",
    "status.live": "이용 가능",
    "status.planned": "준비 중",
    "card.go": "{name}으로 이동",
    "card.planned": "{name}: 아직 열리지 않았습니다",
    "service.wayhand.desc":
        "해외 심부름을 에스크로로 안전하게. 일본·한국에 있는 누군가에게 현지 확인이나 서류 발송을 맡기고, 일이 끝나면 대금을 지급합니다. 구매대행은 준비 중입니다.",
    "service.class.desc": "1:1 글로벌 한국어 회화 및 K-문화 화상 튜터링 플랫폼.",
    "service.asset.desc": "세로형 숏폼 JSON 프롬프트 및 특화 화풍 에셋 직거래소.",
    "service.studio.desc": "대본, AI 더빙, 영상 렌더링을 잇는 멀티미디어 분업 스튜디오.",
    "service.tour.desc": "로컬 맞춤 동선 기획 및 현지 예약 대행 컨시어지.",
    "service.code.desc": "로컬 LLM 설정 및 인프라 트러블슈팅 마이크로 바운티.",
    "service.dub.desc": "AI 기반 다국어 숏폼 번역 및 음성 더빙 외주.",
    "service.biz.desc": "해외 쇼핑몰 및 웹사이트 원격 CS 다국어 위탁 관리.",
    "service.rights.desc": "소프트웨어 원본 소스코드 양도 및 저작권·라이선스 에스크로.",
    "footer.whitepaper": "백서",
    "footer.architecture": "아키텍처",
    "footer.github": "GitHub",
    "footer.note": "OPUS 컨트랙트는 오픈소스이며 아직 외부 감사를 받지 않았습니다. 적은 금액으로 시작하세요.",
    "nav.guide": "가이드: 거래소",
    "guide.home.title": "입금과 출금 방법",
    "guide.home.desc":
        "거래소에서 USDC를 내 지갑으로 가져오고 다시 보내는 방법입니다. 네트워크 수수료로 쓸 POL도 소량 필요합니다.",
    "guide.home.go": "가이드 보기",
    "guide.title": "거래소 입금과 출금",
    "guide.intro":
        "OPUS 서비스를 쓰려면 지갑에 USDC가 있어야 합니다. 거래소의 USDC를 OPUS 앱으로 가져오는 방법과 다시 보내는 방법을 설명합니다.",
    "guide.need.title": "지갑에 필요한 것",
    "guide.need.usdc.title": "USDC",
    "guide.need.usdc.body": "결제하고 받는 돈입니다. 반드시 Polygon 네트워크의 USDC여야 합니다.",
    "guide.need.pol.title": "POL도 소량 필요합니다",
    "guide.need.pol.body":
        "POL은 Polygon에서 네트워크 수수료를 내는 코인입니다. 보통 아주 적은 양(약 1달러어치, 수수료는 바뀔 수 있음)이면 여러 번 보낼 수 있습니다. POL이 없으면 거래소처럼 다른 주소로 USDC를 보낼 수 없습니다.",
    "guide.need.gasless":
        "서비스가 지원하는 경우 OPUS 에스크로 안의 작업은 POL 없이 보낼 수 있습니다. 거래소 등 다른 주소로 USDC를 보낼 때는 항상 POL이 필요합니다.",
    "guide.safety.title": "보내기 전에",
    "guide.safety.network":
        "Polygon 네트워크(Polygon PoS)를 고르세요. 이더리움, 트론, BNB 체인 등 다른 네트워크로 보내면 돈을 영영 잃을 수 있습니다. 거래소가 USDC의 Polygon 네트워크를 지원하지 않으면 그 거래소는 이 용도로 쓰지 마세요.",
    "guide.safety.token": "USDC를 보내세요. 다른 토큰이 아닙니다. 거래소와 앱에서 토큰 이름을 확인하세요.",
    "guide.safety.test": "먼저 소액으로 시험하세요. 주소의 앞뒤 글자를 비교한 뒤 나머지를 보내세요.",
    "guide.safety.final": "블록체인 전송은 되돌릴 수 없습니다.",
    "guide.exchanges.title": "거래소",
    "guide.exchanges.note":
        "예시일 뿐 추천이 아닙니다. OPUS 포털은 이 회사들과 관계가 없고 이 링크로 수익을 얻지 않습니다. 화면, 지원 네트워크, 규칙은 바뀔 수 있으니 각 거래소의 안내를 따르세요. 다른 거래소나 지갑도 같은 방식입니다.",
    "guide.exchange.open": "{name} 열기",
    "guide.gate.desc": "해외 거래소입니다. 내 지갑 주소로 출금할 수 있습니다.",
    "guide.upbit.desc":
        "원화로 사는 한국 거래소입니다. 출금은 먼저 등록하고 본인 확인을 마친 개인지갑(예: 메타마스크)으로만 할 수 있습니다.",
    "guide.in.title": "입금: 거래소 → OPUS 앱",
    "guide.in.gate": "Gate.IO에서",
    "guide.in.upbit": "업비트에서 (한국)",
    "flow.exchange": "거래소",
    "flow.exchange.sub": "USDC와 POL을 소량 구매",
    "flow.upbit": "업비트",
    "flow.upbit.sub": "원화 → USDC와 POL 소량",
    "flow.registered": "등록한 내 지갑",
    "flow.registered.sub": "예: 업비트에서 본인 확인한 메타마스크",
    "flow.app": "OPUS 앱",
    "flow.app.sub": "내 지갑 주소 (받기 화면)",
    "flow.service": "OPUS 서비스",
    "flow.service.sub": "에스크로에 결제 (예: WayHand)",
    "flow.deposit": "거래소 입금 주소",
    "flow.deposit.sub": "Polygon의 USDC",
    "arrow.withdraw": "USDC·POL 출금 · Polygon 네트워크",
    "arrow.withdrawRegistered": "등록한 지갑으로 출금 · Polygon 네트워크",
    "arrow.sendApp": "전송 · Polygon · POL 소량 필요",
    "arrow.pay": "USDC로 결제",
    "arrow.sendBack": "USDC 전송 · Polygon · POL 소량 필요",
    "guide.gate.s1": "Gate.IO에 가입하고 본인 확인을 마칩니다.",
    "guide.gate.s2": "USDC를 사고, POL도 소량 삽니다.",
    "guide.gate.s3": "OPUS 앱의 받기 화면에서 내 주소를 복사합니다.",
    "guide.gate.s4":
        "Gate.IO에서 출금을 시작합니다. USDC, Polygon 네트워크를 고르고 주소를 붙여 넣습니다. POL도 같은 방법으로 출금합니다.",
    "guide.gate.s5": "도착하면 앱에 USDC와 POL 잔액이 보입니다. 둘 다 확인하세요.",
    "guide.upbit.s1":
        "업비트 앱에서 개인지갑(예: 메타마스크)을 등록하고 내 지갑임을 확인합니다. 업비트는 등록한 주소로만 출금할 수 있습니다.",
    "guide.upbit.s2":
        "원화로 USDC와 POL을 소량 삽니다. 업비트가 이 코인들과 출금 네트워크 Polygon을 지원하는지 확인하세요.",
    "guide.upbit.s3": "등록한 지갑으로 Polygon 네트워크를 선택해 출금합니다.",
    "guide.upbit.s4": "OPUS 앱의 받기 화면에서 내 주소를 복사합니다.",
    "guide.upbit.s5":
        "메타마스크에서 Polygon 네트워크로 바꾸고 USDC를 OPUS 앱 주소로 보냅니다. 함께 출금한 POL이 수수료로 쓰입니다.",
    "guide.upbit.s6": "OPUS 앱에서 잔액을 확인합니다.",
    "guide.out.title": "출금: OPUS 앱 → 거래소",
    "guide.out.s1": "거래소에서 USDC 입금 화면을 열고 Polygon 네트워크를 고른 뒤 입금 주소를 복사합니다.",
    "guide.out.s2": "OPUS 앱에서 보내기를 열고 주소를 붙여 넣은 뒤 소액을 입력하고 승인합니다.",
    "guide.out.s3": "시험 금액이 도착하면 나머지를 보냅니다. 수수료는 소량의 POL로 냅니다.",
    "guide.out.s4":
        "거래소에 따라 먼저 등록한 주소에서만 입금을 받거나 보내는 사람의 정보를 묻기도 합니다. 거래소의 규칙을 따르세요.",
    "guide.disclaimer":
        "이 안내는 일반 정보이며 금융·법률 자문이 아닙니다. 거래소와 가상자산 규칙은 나라마다 다릅니다.",
    "guide.polygon.banner":
        "네트워크는 반드시 Polygon을 선택하세요. 이 가이드의 모든 출금과 입금은 Polygon 네트워크여야 합니다. 다른 네트워크를 고르면 돈을 영영 잃을 수 있습니다.",
};

const ja: Record<MessageKey, string> = {
    "brand.tagline": "OPUSエスクローの上のサービス",
    "nav.language": "言語",
    "wallet.connect": "ウォレットを接続",
    "wallet.connecting": "接続しています…",
    "wallet.disconnect": "接続を解除",
    "wallet.browser": "ブラウザのウォレット",
    "wallet.phone": "スマホのウォレット (WalletConnect)",
    "wallet.none":
        "ウォレットが見つかりません。ブラウザのウォレットを入れるか、WalletConnectの設定後にご利用ください。",
    "wallet.connected": "接続中のウォレット",
    "wallet.failed": "ウォレットを接続できませんでした。",
    "hero.title": "OPUSの上に作られたサービス",
    "hero.intro":
        "OPUSはオープンなエスクローです。お金はコントラクトにロックされ、そのルールでのみ動きます。下のサービスはそれぞれのやり方でOPUSを使います。ポータルはサービスを並べるだけで、人を引き合わせることも、お金を預かることもしません。",
    "services.title": "サービス",
    "status.live": "利用可能",
    "status.planned": "準備中",
    "card.go": "{name}へ移動",
    "card.planned": "{name}：まだ開いていません",
    "service.wayhand.desc":
        "海外のお使いをエスクローで安全に。日本・韓国にいる誰かに現地確認や書類の発送を頼み、作業が終わったら支払います。購入代行は準備中です。",
    "service.class.desc": "1対1のグローバル韓国語会話とK-カルチャーのビデオチュータリング。",
    "service.asset.desc": "縦型ショート動画用のJSONプロンプトと、特定画風のアセットを直接取引するマーケット。",
    "service.studio.desc": "台本、AI吹き替え、映像レンダリングをつなぐ、分業制のマルチメディアスタジオ。",
    "service.tour.desc": "現地に合わせた行程づくりと、現地予約代行のコンシェルジュ。",
    "service.code.desc": "ローカルLLMの設定とインフラのトラブル対応のマイクロバウンティ。",
    "service.dub.desc": "AIを使った多言語ショート動画の翻訳と音声吹き替えの外注。",
    "service.biz.desc": "海外のネットショップやウェブサイトの、リモート多言語カスタマーサポートの委託管理。",
    "service.rights.desc": "ソフトウェアの原本ソースコードの譲渡と、著作権・ライセンスのエスクロー。",
    "footer.whitepaper": "ホワイトペーパー",
    "footer.architecture": "アーキテクチャ",
    "footer.github": "GitHub",
    "footer.note": "OPUSのコントラクトはオープンソースで、まだ外部監査を受けていません。少額から始めてください。",
    "nav.guide": "ガイド: 取引所",
    "guide.home.title": "入金と出金の方法",
    "guide.home.desc": "取引所からUSDCをウォレットに移し、再び送る方法です。ネットワーク手数料用にPOLも少量必要です。",
    "guide.home.go": "ガイドを見る",
    "guide.title": "取引所での入金と出金",
    "guide.intro":
        "OPUSのサービスを使うには、ウォレットにUSDCが必要です。取引所のUSDCをOPUSアプリに移す方法と、送り返す方法を説明します。",
    "guide.need.title": "ウォレットに必要なもの",
    "guide.need.usdc.title": "USDC",
    "guide.need.usdc.body": "支払いと受け取りに使うお金です。必ずPolygonネットワークのUSDCを使います。",
    "guide.need.pol.title": "POLも少量必要です",
    "guide.need.pol.body":
        "POLはPolygonでネットワーク手数料を支払うコインです。通常はごく少量(約1ドル分。手数料は変動します)で何度も送れます。POLがないと、取引所など別のアドレスへUSDCを送れません。",
    "guide.need.gasless":
        "サービスが対応していれば、OPUSエスクロー内の操作はPOLなしで送れます。取引所など別のアドレスへUSDCを送るときは、常にPOLが必要です。",
    "guide.safety.title": "送る前に",
    "guide.safety.network":
        "Polygonネットワーク(Polygon PoS)を選びます。Ethereum、Tron、BNB Chainなど別のネットワークに送ると、お金を失う恐れがあります。取引所がUSDCのPolygonに対応していない場合は、この用途には使わないでください。",
    "guide.safety.token":
        "送るのはUSDCです。他のトークンではありません。取引所とアプリでトークン名を確認してください。",
    "guide.safety.test": "まず少額でテストします。アドレスの最初と最後の文字を見比べてから、残りを送ってください。",
    "guide.safety.final": "ブロックチェーンの送金は取り消せません。",
    "guide.exchanges.title": "取引所",
    "guide.exchanges.note":
        "例であり、推奨ではありません。OPUSポータルはこれらの会社と関係がなく、リンクから収益も得ません。画面、対応ネットワーク、ルールは変わるため、各取引所の案内に従ってください。他の取引所やウォレットでも同じ方法です。",
    "guide.exchange.open": "{name}を開く",
    "guide.gate.desc": "海外の取引所です。自分のウォレットアドレスへ出金できます。",
    "guide.upbit.desc":
        "韓国ウォンで購入できる韓国の取引所です。出金は、先に登録して本人確認を済ませた個人ウォレット(例: MetaMask)宛にのみ可能です。",
    "guide.in.title": "入金: 取引所 → OPUSアプリ",
    "guide.in.gate": "Gate.IOから",
    "guide.in.upbit": "Upbitから(韓国)",
    "flow.exchange": "取引所",
    "flow.exchange.sub": "USDCと少量のPOLを購入",
    "flow.upbit": "Upbit",
    "flow.upbit.sub": "韓国ウォン → USDCと少量のPOL",
    "flow.registered": "登録済みの自分のウォレット",
    "flow.registered.sub": "例: Upbitで本人確認したMetaMask",
    "flow.app": "OPUSアプリ",
    "flow.app.sub": "自分のウォレットアドレス(受け取り画面)",
    "flow.service": "OPUSサービス",
    "flow.service.sub": "エスクローに支払い(例: WayHand)",
    "flow.deposit": "取引所の入金アドレス",
    "flow.deposit.sub": "PolygonのUSDC",
    "arrow.withdraw": "USDC・POLを出金 · Polygonネットワーク",
    "arrow.withdrawRegistered": "登録ウォレットへ出金 · Polygonネットワーク",
    "arrow.sendApp": "送金 · Polygon · 少量のPOLが必要",
    "arrow.pay": "USDCで支払い",
    "arrow.sendBack": "USDCを送金 · Polygon · 少量のPOLが必要",
    "guide.gate.s1": "Gate.IOに登録し、本人確認を完了します。",
    "guide.gate.s2": "USDCを購入し、少量のPOLも購入します。",
    "guide.gate.s3": "OPUSアプリの受け取り画面で、自分のアドレスをコピーします。",
    "guide.gate.s4":
        "Gate.IOで出金を始めます。USDC、Polygonネットワークを選び、アドレスを貼り付けます。POLも同じ手順で出金します。",
    "guide.gate.s5": "着金すると、アプリにUSDCとPOLの残高が表示されます。両方を確認してください。",
    "guide.upbit.s1":
        "Upbitアプリで個人ウォレット(例: MetaMask)を登録し、自分のものだと確認します。Upbitは登録済みアドレスへの出金のみ可能です。",
    "guide.upbit.s2":
        "韓国ウォンでUSDCと少量のPOLを購入します。UpbitがこれらとPolygonの出金ネットワークに対応しているか確認してください。",
    "guide.upbit.s3": "登録したウォレットへ、Polygonネットワークを選んで出金します。",
    "guide.upbit.s4": "OPUSアプリの受け取り画面で、自分のアドレスをコピーします。",
    "guide.upbit.s5":
        "MetaMaskでPolygonに切り替え、USDCをOPUSアプリのアドレスへ送ります。一緒に出金したPOLが手数料になります。",
    "guide.upbit.s6": "OPUSアプリで残高を確認します。",
    "guide.out.title": "出金: OPUSアプリ → 取引所",
    "guide.out.s1": "取引所でUSDCの入金画面を開き、Polygonネットワークを選んで、入金アドレスをコピーします。",
    "guide.out.s2": "OPUSアプリで送金を開き、アドレスを貼り付けて少額を入力し、承認します。",
    "guide.out.s3": "テスト送金が着いたら、残りを送ります。手数料は少量のPOLで支払います。",
    "guide.out.s4":
        "取引所によっては、先に登録したアドレスからの入金のみ受け付けたり、送金元の情報を求めたりします。取引所のルールに従ってください。",
    "guide.disclaimer":
        "このガイドは一般的な情報であり、金融・法律上の助言ではありません。取引所や暗号資産のルールは国によって異なります。",
    "guide.polygon.banner":
        "ネットワークは必ずPolygonを選んでください。このガイドのすべての出金と入金はPolygonネットワークで行います。他のネットワークを選ぶと、お金を失う恐れがあります。",
};

const zh: Record<MessageKey, string> = {
    "brand.tagline": "构建在 OPUS 托管之上的服务",
    "nav.language": "语言",
    "wallet.connect": "连接钱包",
    "wallet.connecting": "正在连接…",
    "wallet.disconnect": "断开连接",
    "wallet.browser": "浏览器钱包",
    "wallet.phone": "手机钱包 (WalletConnect)",
    "wallet.none": "未找到钱包。请安装浏览器钱包，或在 WalletConnect 设置好后再使用。",
    "wallet.connected": "已连接的钱包",
    "wallet.failed": "无法连接钱包。",
    "hero.title": "构建在 OPUS 之上的服务",
    "hero.intro":
        "OPUS 是开放的托管：资金锁定在合约中，只按合约规则流转。下面的每个服务都以自己的方式使用它。门户只负责列出服务，不撮合任何人，也从不保管资金。",
    "services.title": "服务",
    "status.live": "可用",
    "status.planned": "筹备中",
    "card.go": "前往 {name}",
    "card.planned": "{name}：尚未开放",
    "service.wayhand.desc":
        "用托管安全地办海外跑腿。请日本或韩国的人帮忙实地查看或寄送文件，事成之后再付款。代购筹备中。",
    "service.class.desc": "一对一全球韩语会话与韩国文化视频辅导。",
    "service.asset.desc": "竖版短视频 JSON 提示词和特色画风素材的直接交易市场。",
    "service.studio.desc": "连接剧本、AI 配音与视频渲染的多媒体分工工作室。",
    "service.tour.desc": "提供本地定制行程规划与当地预订代办的礼宾服务。",
    "service.code.desc": "本地 LLM 配置与基础设施排障的小额悬赏。",
    "service.dub.desc": "基于 AI 的多语种短视频翻译与配音外包。",
    "service.biz.desc": "海外网店与网站的远程多语种客服托管管理。",
    "service.rights.desc": "软件原始源代码转让及版权、许可的托管。",
    "footer.whitepaper": "白皮书",
    "footer.architecture": "架构",
    "footer.github": "GitHub",
    "footer.note": "OPUS 合约为开源，尚未经过独立审计。请从小额开始。",
    "nav.guide": "指南:交易所",
    "guide.home.title": "充值与提现方法",
    "guide.home.desc": "说明如何把交易所的USDC转入钱包并再转回。网络手续费还需要少量POL。",
    "guide.home.go": "查看指南",
    "guide.title": "通过交易所充值与提现",
    "guide.intro": "使用OPUS服务需要钱包中有USDC。本页说明如何把交易所的USDC转入OPUS应用,以及如何再转回。",
    "guide.need.title": "钱包中需要的东西",
    "guide.need.usdc.title": "USDC",
    "guide.need.usdc.body": "用于支付和收款的钱。必须是Polygon网络上的USDC。",
    "guide.need.pol.title": "还需要少量POL",
    "guide.need.pol.body":
        "POL是在Polygon上支付网络手续费的代币。通常很少的数量(约1美元,手续费会变动)就能转很多次。没有POL就无法把USDC转到交易所等其他地址。",
    "guide.need.gasless": "在服务支持的情况下,OPUS托管内的操作无需POL。向交易所等其他地址转USDC时,始终需要POL。",
    "guide.safety.title": "转账之前",
    "guide.safety.network":
        "请选择Polygon网络(Polygon PoS)。若选择以太坊、波场、BNB链等其他网络,资金可能永久丢失。如果交易所不支持USDC的Polygon网络,请不要用它来做这件事。",
    "guide.safety.token": "请发送USDC,而不是其他代币。请在交易所和应用中确认代币名称。",
    "guide.safety.test": "先小额测试。核对地址的开头和结尾字符,再转其余部分。",
    "guide.safety.final": "区块链转账无法撤销。",
    "guide.exchanges.title": "交易所",
    "guide.exchanges.note":
        "仅为示例,并非推荐。OPUS门户与这些公司无关,也不从这些链接获利。界面、支持的网络和规则可能变化,请遵循各交易所自己的指引。其他交易所和钱包的做法相同。",
    "guide.exchange.open": "打开{name}",
    "guide.gate.desc": "海外交易所。可以提现到自己的钱包地址。",
    "guide.upbit.desc": "可用韩元购买的韩国交易所。提现只能转到事先登记并通过本人验证的个人钱包(例如MetaMask)。",
    "guide.in.title": "充值:交易所 → OPUS应用",
    "guide.in.gate": "从Gate.IO",
    "guide.in.upbit": "从Upbit(韩国)",
    "flow.exchange": "交易所",
    "flow.exchange.sub": "购买USDC和少量POL",
    "flow.upbit": "Upbit",
    "flow.upbit.sub": "韩元 → USDC和少量POL",
    "flow.registered": "已登记的钱包",
    "flow.registered.sub": "例如已在Upbit验证的MetaMask",
    "flow.app": "OPUS应用",
    "flow.app.sub": "你的钱包地址(接收页面)",
    "flow.service": "OPUS服务",
    "flow.service.sub": "向托管付款(例如WayHand)",
    "flow.deposit": "交易所充值地址",
    "flow.deposit.sub": "Polygon上的USDC",
    "arrow.withdraw": "提现USDC和POL · Polygon网络",
    "arrow.withdrawRegistered": "提现到已登记钱包 · Polygon网络",
    "arrow.sendApp": "转账 · Polygon · 需要少量POL",
    "arrow.pay": "用USDC付款",
    "arrow.sendBack": "转USDC · Polygon · 需要少量POL",
    "guide.gate.s1": "注册Gate.IO并完成身份验证。",
    "guide.gate.s2": "购买USDC,并购买少量POL。",
    "guide.gate.s3": "在OPUS应用的接收页面复制你的地址。",
    "guide.gate.s4": "在Gate.IO发起提现。选择USDC和Polygon网络,粘贴你的地址。POL也同样提现。",
    "guide.gate.s5": "到账后,应用会显示USDC和POL余额。请两个都确认。",
    "guide.upbit.s1": "在Upbit应用中登记个人钱包(例如MetaMask)并验证归属。Upbit只能提现到已登记的地址。",
    "guide.upbit.s2": "用韩元购买USDC和少量POL。请确认Upbit上有这些币,并支持Polygon提现网络。",
    "guide.upbit.s3": "选择Polygon网络,提现到已登记的钱包。",
    "guide.upbit.s4": "在OPUS应用的接收页面复制你的地址。",
    "guide.upbit.s5": "在MetaMask中切换到Polygon,把USDC转到你的OPUS应用地址。一起提现的POL用于支付手续费。",
    "guide.upbit.s6": "在OPUS应用中确认余额。",
    "guide.out.title": "提现:OPUS应用 → 交易所",
    "guide.out.s1": "在交易所打开USDC充值页面,选择Polygon网络,复制充值地址。",
    "guide.out.s2": "在OPUS应用打开发送,粘贴地址,输入小额测试金额并确认。",
    "guide.out.s3": "测试金额到账后,再转其余部分。手续费用少量POL支付。",
    "guide.out.s4": "部分交易所只接受事先登记地址的充值,或要求提供转出方信息。请遵循交易所的规则。",
    "guide.disclaimer": "本指南仅为一般信息,不构成金融或法律建议。各国对交易所和加密资产的规定不同。",
    "guide.polygon.banner":
        "网络必须选择Polygon。本指南中的所有提现和充值都必须使用Polygon网络。选择其他网络可能导致资金永久丢失。",
};

export const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, ko, ja, zh };

/** The text for `key` in `locale`, with `{name}` slots filled from `vars`. */
export function translate(locale: Locale, key: MessageKey, vars: Record<string, string | number> = {}): string {
    const text = MESSAGES[locale][key] ?? en[key];
    return text.replace(/\{(\w+)\}/g, (slot, name: string) => (name in vars ? String(vars[name]) : slot));
}
