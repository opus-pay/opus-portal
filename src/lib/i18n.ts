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
    "service.wayhand.name": "WayHand",
    "service.wayhand.desc":
        "Errands abroad, paid through escrow. Ask someone in Japan or Korea to check a place or send documents, and pay when the work is done.",
    "service.paymentLinks.name": "Payment links",
    "service.paymentLinks.desc": "Send or receive a payment that stays locked until the work or delivery is confirmed.",
    "service.parentCare.name": "Care for parents",
    "service.parentCare.desc":
        "A trusted local helper who goes with your parents to a hospital visit and reports back.",
    "service.travelEscort.name": "Travel with parents",
    "service.travelEscort.desc": "Someone to accompany your parents on a trip, with a check-in at each leg.",
    "service.assistant.name": "AI assistant",
    "service.assistant.desc": "Let an AI assistant post and do errands for you, within limits you set.",
    "service.court.name": "OPUS Court",
    "service.court.desc": "Independent arbiters who settle disagreements on jobs, for services that need them.",
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
    "status.live": "이용 가능",
    "status.planned": "준비 중",
    "card.go": "{name}으로 이동",
    "card.planned": "{name}: 아직 열리지 않았습니다",
    "service.wayhand.name": "WayHand",
    "service.wayhand.desc":
        "해외 심부름을 에스크로로 안전하게. 일본·한국에 있는 누군가에게 현지 확인이나 서류 발송을 맡기고, 일이 끝나면 대금을 지급합니다.",
    "service.paymentLinks.name": "결제 링크",
    "service.paymentLinks.desc": "일이나 배송이 확인될 때까지 잠겨 있는 결제를 보내고 받습니다.",
    "service.parentCare.name": "부모님 돌봄",
    "service.parentCare.desc": "믿을 수 있는 현지 도우미가 부모님의 병원 방문에 동행하고 결과를 알려 줍니다.",
    "service.travelEscort.name": "부모님 여행 동행",
    "service.travelEscort.desc": "부모님의 여행에 동행하며 구간마다 안부를 확인해 줍니다.",
    "service.assistant.name": "AI 비서",
    "service.assistant.desc": "정해 둔 한도 안에서 AI 비서가 심부름을 올리고 대신 처리합니다.",
    "service.court.name": "OPUS 법정",
    "service.court.desc": "중재가 필요한 서비스를 위해, 독립된 중재인이 작업의 분쟁을 판단합니다.",
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
    "status.live": "利用可能",
    "status.planned": "準備中",
    "card.go": "{name}へ移動",
    "card.planned": "{name}：まだ開いていません",
    "service.wayhand.name": "WayHand",
    "service.wayhand.desc":
        "海外のお使いをエスクローで安全に。日本・韓国にいる誰かに現地確認や書類の発送を頼み、作業が終わったら支払います。",
    "service.paymentLinks.name": "支払いリンク",
    "service.paymentLinks.desc": "作業や配送が確認されるまでロックされる支払いを、送ったり受け取ったりします。",
    "service.parentCare.name": "親のケア",
    "service.parentCare.desc": "信頼できる現地のヘルパーが、ご両親の通院に付き添い、結果を知らせます。",
    "service.travelEscort.name": "親の旅行の付き添い",
    "service.travelEscort.desc": "ご両親の旅行に同行し、区間ごとに安否を確認します。",
    "service.assistant.name": "AIアシスタント",
    "service.assistant.desc": "決めた上限の範囲で、AIアシスタントがお使いを投稿し、代わりに進めます。",
    "service.court.name": "OPUSコート",
    "service.court.desc": "調停が必要なサービスのために、独立した調停人が作業の争いを判断します。",
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
    "status.live": "可用",
    "status.planned": "筹备中",
    "card.go": "前往 {name}",
    "card.planned": "{name}：尚未开放",
    "service.wayhand.name": "WayHand",
    "service.wayhand.desc": "用托管安全地办海外跑腿。请日本或韩国的人帮忙实地查看或寄送文件，事成之后再付款。",
    "service.paymentLinks.name": "付款链接",
    "service.paymentLinks.desc": "发送或接收一笔付款，在工作或送达得到确认之前保持锁定。",
    "service.parentCare.name": "照顾父母",
    "service.parentCare.desc": "可信赖的当地帮手陪同父母就医，并向你汇报情况。",
    "service.travelEscort.name": "陪同父母旅行",
    "service.travelEscort.desc": "有人陪伴父母出行，并在每一段行程报平安。",
    "service.assistant.name": "AI 助手",
    "service.assistant.desc": "在你设定的限额内，让 AI 助手代你发布并办理跑腿。",
    "service.court.name": "OPUS 仲裁庭",
    "service.court.desc": "为需要仲裁的服务提供独立仲裁人，裁决工作中的争议。",
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
