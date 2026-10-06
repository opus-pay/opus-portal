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
    "listing.note":
        "Services are listed after the OPUS team has talked with them and agreed terms. Anyone can build on OPUS, but only agreed services appear here.",
    "listing.cta": "List your service",
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
    "listing.note":
        "서비스는 OPUS 팀과 이야기를 나누고 조건에 합의한 뒤에 목록에 올라갑니다. 누구나 OPUS 위에 서비스를 만들 수 있지만, 이 목록에는 합의한 서비스만 나옵니다.",
    "listing.cta": "서비스 등록 문의",
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
    "listing.note":
        "サービスは、OPUSチームと話し合い、条件に合意した後に掲載されます。誰でもOPUSの上にサービスを作れますが、ここに載るのは合意したサービスだけです。",
    "listing.cta": "掲載のお問い合わせ",
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
    "listing.note":
        "服务在与 OPUS 团队沟通并商定条款后才会被列出。任何人都可以在 OPUS 上构建服务，但这里只显示已达成协议的服务。",
    "listing.cta": "申请列入",
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
};

export const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, ko, ja, zh };

/** The text for `key` in `locale`, with `{name}` slots filled from `vars`. */
export function translate(locale: Locale, key: MessageKey, vars: Record<string, string | number> = {}): string {
    const text = MESSAGES[locale][key] ?? en[key];
    return text.replace(/\{(\w+)\}/g, (slot, name: string) => (name in vars ? String(vars[name]) : slot));
}
