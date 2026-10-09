import type { Locale } from "./i18n";

/**
 * The words of the architecture document (architecture.ts names the keys). Function names such as `fund` are the
 * contracts' own and stay as they are in every language.
 */
const en = {
    "arch.title": "How OPUS works",
    "arch.intro":
        "The parts, and the order in which they talk to each other, from creating an escrow to paying out. Press a title to read it.",
    "arch.expandAll": "Open all",
    "arch.collapseAll": "Close all",
    "arch.scroll": "Swipe sideways to see the whole diagram.",

    "actor.client": "Client",
    "actor.provider": "Provider",
    "actor.service": "A service (for example WayHand)",
    "actor.factory": "Factory",
    "actor.core": "Escrow instance",
    "actor.evaluator": "Evaluator",
    "actor.forwarder": "Forwarder",
    "actor.relayer": "Relayer",
    "actor.arbiter": "Arbiter",
    "actor.anyone": "Anyone (the keeper)",
    "actor.treasury": "Fee recipient",
    "actor.wallet": "Your wallet",

    "item.overview": "Overview: who does what",
    "overview.intro":
        "OPUS is a set of small contracts on Polygon that hold a payment until the work is done. Services such as WayHand are built on top of it, and people reach them with a wallet.",
    "layer.portal": "OPUS Portal",
    "layer.portal.body": "A directory of services. It lists them; it never holds money.",
    "layer.services": "Services, for example WayHand",
    "layer.services.body": "Matching, identity checks, evidence, notices and support.",
    "layer.offchain": "SDK, relayer, keeper, indexer",
    "layer.offchain.body":
        "Helpers outside the chain: build the calls, pay the network fee, trigger deadlines, read the history.",
    "layer.onchain": "Contracts on Polygon",
    "layer.onchain.body": "Factory, escrow instance, evaluator, forwarder. Fixed once deployed, with no admin.",
    "overview.caption": "Money only ever sits in the bottom layer.",

    "item.parts": "The parts",
    "part.factory": "Factory",
    "part.factory.body": "Anyone can make an escrow instance through it. It has no owner.",
    "part.core": "Escrow instance",
    "part.core.body":
        "Holds the money of each job. One instance per token and fee setting; the fee and who receives it can never change.",
    "part.evaluator": "Evaluator",
    "part.evaluator.body":
        "Decides how a job ends, by rules the client set before paying: confirmation, silence, objection, ruling.",
    "part.forwarder": "Forwarder and relayer",
    "part.forwarder.body": "Let people take a step by signing only. The relayer pays the network fee.",
    "part.keeper": "Keeper",
    "part.keeper.body": "Calls the deadline triggers on time. If it stops, anyone can make the same calls.",
    "part.sdk": "SDK and indexer",
    "part.sdk.body": "Build the calls, check what was really funded, and read events for statistics.",
    "part.arbiter": "Arbiter",
    "part.arbiter.body": "Rules on an objection. One address at first, a voting court later.",

    "item.create": "1. Making an escrow instance",
    "create.intro": "A service does this once. Everything after it uses that instance.",
    "seq.create.label": "Making an escrow instance",
    "seq.create.1": "createInstance(token, fee recipient, fee %)",
    "seq.create.2": "Creates the instance with those settings fixed",
    "seq.create.3": "The instance address (the same settings always give the same instance)",
    "seq.create.note":
        "No admin: the token, the fee and who receives it can never be changed. A fee is taken only when a job completes.",

    "item.post": "2. Posting an errand and paying into escrow",
    "post.intro":
        "The money leaves the client's wallet only at the last step, and goes into the escrow, not to the provider.",
    "seq.post.label": "Posting and paying into escrow",
    "seq.post.1": "createJob(provider, evaluator, deadline, hash of the description)",
    "seq.post.2": "setBudget: the price the provider quotes",
    "seq.post.3": "configure: review time, what silence means, arbiter, evaluation fee",
    "seq.post.4":
        "fund: exactly the quoted amount moves from the wallet into escrow (fundWithPermit signs the USDC approval in the same step)",
    "seq.post.note":
        "After funding, the provider, price, deadline and rules cannot change. A job is limited to 100 USDC for now.",

    "item.complete": "3. Finishing and paying out",
    "complete.intro": "The provider is paid, and the service fee is taken, only when the job completes.",
    "seq.complete.label": "Finishing and paying out",
    "seq.complete.1": "submit: a hash of the proof of work",
    "seq.complete.2": "approveJob (or, if the client is silent, anyone calls finalize after the review time)",
    "seq.complete.3": "complete",
    "seq.complete.4": "Pays the price minus the service fee",
    "seq.complete.5": "Pays the service fee",
    "seq.complete.note": "A refund or a rejection takes no fee.",

    "item.deadlines": "4. When nobody answers: deadlines",
    "deadlines.intro":
        "Every funded job ends. Anyone can call the triggers, so no single operator can leave a job stuck.",
    "seq.deadlines.label": "Deadlines and refunds",
    "seq.deadlines.a": "The provider sent no proof by the deadline",
    "seq.deadlines.1": "timeoutNoSubmission",
    "seq.deadlines.2": "reject",
    "seq.deadlines.3": "Refund in full",
    "seq.deadlines.b": "The proof is in, but the client is silent after the review time",
    "seq.deadlines.4": "finalize (completes) or escalateOnSilence (goes to the arbiter), as set before funding",
    "seq.deadlines.5": "complete: the provider is paid",
    "seq.deadlines.c": "The evaluator itself is stuck, and the final deadline has passed",
    "seq.deadlines.6": "claimRefund",
    "seq.deadlines.7": "Refund in full",

    "item.dispute": "5. An objection and a ruling",
    "dispute.intro":
        "The client objects when the work is not as agreed. Payment stops until an arbiter rules, or the default applies.",
    "seq.dispute.label": "An objection and a ruling",
    "seq.dispute.1": "object, within the review time: payment stops",
    "seq.dispute.2": "postDeposit: both sides put up a small dispute deposit",
    "seq.dispute.3": "The case goes to the arbiter",
    "seq.dispute.4": "rule: pay the provider, or refund the client",
    "seq.dispute.5": "complete or reject: the winner is paid, and the loser's deposit pays the arbiter",
    "seq.dispute.note":
        "No ruling in time: anyone calls resolveByDefault and the default set before funding applies. At any time the client may approve, or the provider withdraw, and the dispute ends.",

    "item.relay": "6. Signing without paying the network fee",
    "relay.intro":
        "A person only signs. A relayer sends the step and pays the network fee, so a wallet needs no POL for these steps.",
    "seq.relay.label": "Sending a step through a relayer",
    "seq.relay.1": "Signs the step (no money moves, no network fee)",
    "seq.relay.2": "Sends the signed request",
    "seq.relay.3": "execute: sends it and pays the network fee",
    "seq.relay.4": "Calls the contract; the sender is still your wallet",
    "seq.relay.note":
        "A relayer cannot forge a signature or move your money. If it is down, send the same step yourself with a little POL.",

    "item.safety": "What cannot go wrong, and what can",
    "safety.1":
        "No admin, no owner, no pause button, no upgrades. A new version is a new deployment that people choose to move to.",
    "safety.2":
        "Money goes only to: the client (a refund), the provider (on completion), the fee recipient (on completion only), or whoever withdraws their own held payout.",
    "safety.3":
        "Every funded job ends: through the evaluator's deadlines or, in any case, through the refund after the final deadline.",
    "safety.4": "After funding, the rules cannot change, except the client's single extension of the review time.",
    "safety.5":
        "If the token issuer freezes an address, the job still ends and the money waits to be withdrawn to another address.",
    "safety.6": "The code is open source and has not been audited yet. Each job is limited to 100 USDC for now.",
};

export type ArchText = Record<keyof typeof en, string>;

const ko: ArchText = {
    "arch.title": "OPUS는 이렇게 움직입니다",
    "arch.intro":
        "에스크로를 만들고 돈이 지급되기까지, 각 부분이 어떤 순서로 서로 말을 주고받는지 설명합니다. 제목을 누르면 내용이 보입니다.",
    "arch.expandAll": "모두 펼치기",
    "arch.collapseAll": "모두 접기",
    "arch.scroll": "다이어그램은 옆으로 밀어서 전체를 볼 수 있습니다.",

    "actor.client": "의뢰인",
    "actor.provider": "수행자",
    "actor.service": "서비스 (예: WayHand)",
    "actor.factory": "팩토리",
    "actor.core": "에스크로 인스턴스",
    "actor.evaluator": "평가자",
    "actor.forwarder": "포워더",
    "actor.relayer": "릴레이어",
    "actor.arbiter": "중재자",
    "actor.anyone": "누구나 (키퍼)",
    "actor.treasury": "수수료 수령 주소",
    "actor.wallet": "내 지갑",

    "item.overview": "한눈에 보기: 누가 무엇을 하나",
    "overview.intro":
        "OPUS는 일이 끝날 때까지 결제 금액을 맡아 두는 작은 컨트랙트 묶음으로, 폴리곤 위에 있습니다. WayHand 같은 서비스가 그 위에 만들어지고, 사람들은 지갑으로 이용합니다.",
    "layer.portal": "OPUS 포털",
    "layer.portal.body": "서비스를 모아 보여 주는 목록입니다. 소개만 하고 돈은 맡지 않습니다.",
    "layer.services": "서비스 (예: WayHand)",
    "layer.services.body": "사람 연결, 본인 확인, 증빙, 알림, 상담을 맡습니다.",
    "layer.offchain": "SDK, 릴레이어, 키퍼, 인덱서",
    "layer.offchain.body":
        "체인 밖의 도우미입니다. 호출 만들기, 네트워크 수수료 대신 내기, 기한 알리기, 기록 읽기를 합니다.",
    "layer.onchain": "폴리곤 위의 컨트랙트",
    "layer.onchain.body": "팩토리, 에스크로 인스턴스, 평가자, 포워더. 배포하면 바뀌지 않고 관리자도 없습니다.",
    "overview.caption": "돈은 맨 아래 층에만 있습니다.",

    "item.parts": "구성 요소",
    "part.factory": "팩토리",
    "part.factory.body": "누구나 여기서 에스크로 인스턴스를 만들 수 있습니다. 주인이 없습니다.",
    "part.core": "에스크로 인스턴스",
    "part.core.body":
        "심부름마다 돈을 맡아 둡니다. 토큰과 수수료 설정마다 하나씩 있고, 수수료와 받는 곳은 바꿀 수 없습니다.",
    "part.evaluator": "평가자",
    "part.evaluator.body": "의뢰인이 결제 전에 정한 규칙(확인, 침묵, 이의, 판정)에 따라 일이 어떻게 끝날지 정합니다.",
    "part.forwarder": "포워더와 릴레이어",
    "part.forwarder.body": "사람은 서명만 하면 됩니다. 릴레이어가 네트워크 수수료를 내고 대신 보냅니다.",
    "part.keeper": "키퍼",
    "part.keeper.body": "기한이 되면 정해진 호출을 합니다. 멈추면 누구나 같은 호출을 할 수 있습니다.",
    "part.sdk": "SDK와 인덱서",
    "part.sdk.body": "호출을 만들고, 실제로 맡긴 금액을 확인하고, 통계를 위해 기록을 읽습니다.",
    "part.arbiter": "중재자",
    "part.arbiter.body": "이의가 나오면 판정합니다. 처음에는 주소 하나이고, 나중에는 투표하는 법정입니다.",

    "item.create": "1. 에스크로 인스턴스 만들기",
    "create.intro": "서비스가 한 번 합니다. 이후의 모든 일은 이 인스턴스를 씁니다.",
    "seq.create.label": "에스크로 인스턴스 만들기",
    "seq.create.1": "createInstance(토큰, 수수료 받는 주소, 수수료 %)",
    "seq.create.2": "그 설정을 고정한 채로 인스턴스를 만듭니다",
    "seq.create.3": "인스턴스 주소 (같은 설정이면 언제나 같은 인스턴스입니다)",
    "seq.create.note":
        "관리자가 없습니다. 토큰, 수수료, 받는 곳은 바꿀 수 없습니다. 수수료는 일이 완료될 때만 받습니다.",

    "item.post": "2. 심부름을 올리고 에스크로에 결제하기",
    "post.intro": "돈은 마지막 단계에서야 의뢰인 지갑을 떠나고, 수행자가 아니라 에스크로로 들어갑니다.",
    "seq.post.label": "올리기와 에스크로 결제",
    "seq.post.1": "createJob(수행자, 평가자, 기한, 설명의 해시)",
    "seq.post.2": "setBudget: 수행자가 부른 금액",
    "seq.post.3": "configure: 확인 기간, 침묵의 의미, 중재자, 평가 수수료",
    "seq.post.4":
        "fund: 부른 금액만큼이 지갑에서 에스크로로 이동합니다 (fundWithPermit은 USDC 승인 서명까지 한 번에 합니다)",
    "seq.post.note": "결제 뒤에는 수행자, 금액, 기한, 규칙을 바꿀 수 없습니다. 지금은 한 건에 100 USDC까지입니다.",

    "item.complete": "3. 끝내고 지급하기",
    "complete.intro": "수행자 지급과 서비스 수수료는 일이 완료될 때만 이루어집니다.",
    "seq.complete.label": "끝내고 지급하기",
    "seq.complete.1": "submit: 증빙의 해시",
    "seq.complete.2": "approveJob (의뢰인이 답이 없으면 확인 기간 뒤에 누구나 finalize)",
    "seq.complete.3": "complete",
    "seq.complete.4": "금액에서 서비스 수수료를 뺀 만큼 지급",
    "seq.complete.5": "서비스 수수료 지급",
    "seq.complete.note": "환불이나 거절에는 수수료가 없습니다.",

    "item.deadlines": "4. 아무도 답하지 않을 때: 기한",
    "deadlines.intro":
        "결제된 일은 반드시 끝납니다. 누구나 호출할 수 있어서, 한 운영자 때문에 일이 멈추는 일이 없습니다.",
    "seq.deadlines.label": "기한과 환불",
    "seq.deadlines.a": "기한까지 수행자가 증빙을 보내지 않음",
    "seq.deadlines.1": "timeoutNoSubmission",
    "seq.deadlines.2": "reject",
    "seq.deadlines.3": "전액 환불",
    "seq.deadlines.b": "증빙은 왔는데 확인 기간이 지나도 의뢰인이 답이 없음",
    "seq.deadlines.4": "finalize(완료) 또는 escalateOnSilence(중재로 넘김): 결제 전에 정한 대로",
    "seq.deadlines.5": "complete: 수행자에게 지급",
    "seq.deadlines.c": "평가자 자체가 멈췄고 마지막 기한이 지남",
    "seq.deadlines.6": "claimRefund",
    "seq.deadlines.7": "전액 환불",

    "item.dispute": "5. 이의 제기와 판정",
    "dispute.intro":
        "일이 약속과 다르면 의뢰인이 이의를 냅니다. 중재자가 판정하거나 기본값이 적용될 때까지 지급은 멈춥니다.",
    "seq.dispute.label": "이의 제기와 판정",
    "seq.dispute.1": "object, 확인 기간 안에: 지급이 멈춥니다",
    "seq.dispute.2": "postDeposit: 양쪽이 소액의 분쟁 보증금을 냅니다",
    "seq.dispute.3": "사건이 중재자에게 넘어갑니다",
    "seq.dispute.4": "rule: 수행자에게 지급, 또는 의뢰인에게 환불",
    "seq.dispute.5": "complete 또는 reject: 이긴 쪽이 받고, 진 쪽의 보증금이 중재자에게 갑니다",
    "seq.dispute.note":
        "제때 판정이 없으면 누구나 resolveByDefault를 호출하고, 결제 전에 정한 기본값이 적용됩니다. 의뢰인은 언제든 승인할 수 있고 수행자는 언제든 철회할 수 있어서, 그러면 분쟁이 끝납니다.",

    "item.relay": "6. 네트워크 수수료 없이 서명만으로 보내기",
    "relay.intro":
        "사람은 서명만 합니다. 릴레이어가 그 단계를 보내고 네트워크 수수료를 내므로, 이 단계들에는 지갑에 POL이 필요 없습니다.",
    "seq.relay.label": "릴레이어로 단계 보내기",
    "seq.relay.1": "단계에 서명합니다 (돈이 움직이지 않고 네트워크 수수료도 없습니다)",
    "seq.relay.2": "서명한 요청을 보냅니다",
    "seq.relay.3": "execute: 대신 보내고 네트워크 수수료를 냅니다",
    "seq.relay.4": "컨트랙트를 호출합니다. 보낸 사람은 여전히 내 지갑입니다",
    "seq.relay.note":
        "릴레이어는 서명을 위조하거나 내 돈을 움직일 수 없습니다. 멈춰 있으면 POL을 조금 넣고 같은 단계를 직접 보내면 됩니다.",

    "item.safety": "안 되는 것과 될 수 있는 것",
    "safety.1":
        "관리자, 소유자, 일시정지 버튼, 업그레이드가 없습니다. 새 버전은 새로 배포한 것이고, 옮길지는 사람들이 고릅니다.",
    "safety.2":
        "돈은 의뢰인(환불), 수행자(완료 시), 수수료 받는 곳(완료 시에만), 맡겨진 자기 몫을 찾아가는 사람에게만 갑니다.",
    "safety.3":
        "결제된 일은 모두 끝납니다. 평가자의 기한으로 끝나거나, 어떤 경우에도 마지막 기한 뒤의 환불로 끝납니다.",
    "safety.4": "결제 뒤에는 규칙을 바꿀 수 없습니다. 의뢰인이 확인 기간을 한 번 늘리는 것만 예외입니다.",
    "safety.5": "토큰 발행사가 주소를 동결해도 일은 끝나고, 돈은 다른 주소로 찾아갈 수 있게 보관됩니다.",
    "safety.6": "코드는 오픈소스이고 아직 외부 감사를 받지 않았습니다. 지금은 한 건에 100 USDC까지입니다.",
};

const ja: ArchText = {
    "arch.title": "OPUSの仕組み",
    "arch.intro":
        "エスクローを作ってから支払われるまで、各部分がどの順番でやり取りするかを説明します。タイトルを押すと内容が開きます。",
    "arch.expandAll": "すべて開く",
    "arch.collapseAll": "すべて閉じる",
    "arch.scroll": "図は横にスワイプすると全体が見えます。",

    "actor.client": "依頼者",
    "actor.provider": "受注者",
    "actor.service": "サービス（例: WayHand）",
    "actor.factory": "ファクトリー",
    "actor.core": "エスクロー本体",
    "actor.evaluator": "評価者",
    "actor.forwarder": "フォワーダー",
    "actor.relayer": "リレイヤー",
    "actor.arbiter": "仲裁者",
    "actor.anyone": "だれでも（キーパー）",
    "actor.treasury": "手数料の受取先",
    "actor.wallet": "あなたのウォレット",

    "item.overview": "全体像: だれが何をするか",
    "overview.intro":
        "OPUSは、仕事が終わるまで代金を預かる小さなコントラクトの集まりで、Polygon上にあります。WayHandのようなサービスがその上に作られ、人はウォレットで利用します。",
    "layer.portal": "OPUSポータル",
    "layer.portal.body": "サービスの一覧です。紹介するだけで、お金は預かりません。",
    "layer.services": "サービス（例: WayHand）",
    "layer.services.body": "マッチング、本人確認、証拠、通知、サポートを担当します。",
    "layer.offchain": "SDK、リレイヤー、キーパー、インデクサー",
    "layer.offchain.body":
        "チェーンの外の助手です。呼び出しの作成、ネットワーク手数料の肩代わり、期限の実行、履歴の読み取りをします。",
    "layer.onchain": "Polygon上のコントラクト",
    "layer.onchain.body":
        "ファクトリー、エスクロー本体、評価者、フォワーダー。デプロイ後は変わらず、管理者もいません。",
    "overview.caption": "お金があるのは、いちばん下の層だけです。",

    "item.parts": "構成要素",
    "part.factory": "ファクトリー",
    "part.factory.body": "だれでもここからエスクロー本体を作れます。持ち主はいません。",
    "part.core": "エスクロー本体",
    "part.core.body": "依頼ごとにお金を預かります。トークンと手数料設定ごとに1つで、手数料と受取先は変えられません。",
    "part.evaluator": "評価者",
    "part.evaluator.body":
        "依頼者が支払い前に決めたルール（確認、無応答、異議、裁定）に従って、依頼の終わり方を決めます。",
    "part.forwarder": "フォワーダーとリレイヤー",
    "part.forwarder.body": "人は署名するだけです。リレイヤーがネットワーク手数料を払って代わりに送ります。",
    "part.keeper": "キーパー",
    "part.keeper.body": "期限が来たら決められた呼び出しを行います。止まっても、だれでも同じ呼び出しができます。",
    "part.sdk": "SDKとインデクサー",
    "part.sdk.body": "呼び出しを作り、実際に預けた金額を確かめ、統計のために履歴を読みます。",
    "part.arbiter": "仲裁者",
    "part.arbiter.body": "異議が出たら裁定します。最初は1つのアドレスで、のちに投票する法廷になります。",

    "item.create": "1. エスクロー本体を作る",
    "create.intro": "サービスが一度だけ行います。以降のすべてがこの本体を使います。",
    "seq.create.label": "エスクロー本体を作る",
    "seq.create.1": "createInstance(トークン, 手数料の受取先, 手数料%)",
    "seq.create.2": "その設定を固定したまま本体を作ります",
    "seq.create.3": "本体のアドレス（同じ設定なら、いつも同じ本体です）",
    "seq.create.note":
        "管理者はいません。トークン、手数料、受取先は変えられません。手数料は依頼が完了したときだけ取ります。",

    "item.post": "2. 依頼を出してエスクローに支払う",
    "post.intro": "お金が依頼者のウォレットを出るのは最後の段階だけで、行き先は受注者ではなくエスクローです。",
    "seq.post.label": "投稿とエスクローへの支払い",
    "seq.post.1": "createJob(受注者, 評価者, 期限, 説明のハッシュ)",
    "seq.post.2": "setBudget: 受注者が提示した金額",
    "seq.post.3": "configure: 確認期間、無応答の扱い、仲裁者、評価手数料",
    "seq.post.4":
        "fund: 提示どおりの金額がウォレットからエスクローへ移ります（fundWithPermitはUSDCの承認署名も一度で行います）",
    "seq.post.note": "支払い後は、受注者、金額、期限、ルールを変えられません。今は1件100 USDCまでです。",

    "item.complete": "3. 完了と支払い",
    "complete.intro": "受注者への支払いとサービス手数料は、依頼が完了したときだけ発生します。",
    "seq.complete.label": "完了と支払い",
    "seq.complete.1": "submit: 証拠のハッシュ",
    "seq.complete.2": "approveJob（依頼者が無応答なら、確認期間のあとにだれでもfinalize）",
    "seq.complete.3": "complete",
    "seq.complete.4": "金額からサービス手数料を引いた分を支払い",
    "seq.complete.5": "サービス手数料を支払い",
    "seq.complete.note": "返金や却下には手数料はかかりません。",

    "item.deadlines": "4. だれも応答しないとき: 期限",
    "deadlines.intro":
        "支払い済みの依頼は必ず終わります。だれでも呼び出せるので、特定の運営者のせいで止まることはありません。",
    "seq.deadlines.label": "期限と返金",
    "seq.deadlines.a": "期限までに受注者が証拠を送らない",
    "seq.deadlines.1": "timeoutNoSubmission",
    "seq.deadlines.2": "reject",
    "seq.deadlines.3": "全額返金",
    "seq.deadlines.b": "証拠は届いたが、確認期間が過ぎても依頼者が無応答",
    "seq.deadlines.4": "finalize（完了）またはescalateOnSilence（仲裁へ）: 支払い前の設定どおり",
    "seq.deadlines.5": "complete: 受注者に支払い",
    "seq.deadlines.c": "評価者自体が止まり、最終期限が過ぎた",
    "seq.deadlines.6": "claimRefund",
    "seq.deadlines.7": "全額返金",

    "item.dispute": "5. 異議と裁定",
    "dispute.intro":
        "依頼が約束と違うとき、依頼者が異議を出します。仲裁者が裁定するか、既定の結果になるまで支払いは止まります。",
    "seq.dispute.label": "異議と裁定",
    "seq.dispute.1": "object（確認期間内）: 支払いが止まります",
    "seq.dispute.2": "postDeposit: 双方が少額の紛争保証金を預けます",
    "seq.dispute.3": "案件が仲裁者に渡ります",
    "seq.dispute.4": "rule: 受注者に支払う、または依頼者に返金する",
    "seq.dispute.5": "completeまたはreject: 勝った側が受け取り、負けた側の保証金が仲裁者に支払われます",
    "seq.dispute.note":
        "期限内に裁定がなければ、だれでもresolveByDefaultを呼べて、支払い前に決めた既定の結果になります。依頼者はいつでも承認でき、受注者はいつでも撤回でき、その時点で紛争は終わります。",

    "item.relay": "6. ネットワーク手数料なしで、署名だけで送る",
    "relay.intro":
        "人は署名するだけです。リレイヤーがその手順を送ってネットワーク手数料を払うので、これらの手順にはウォレットのPOLは不要です。",
    "seq.relay.label": "リレイヤー経由で送る",
    "seq.relay.1": "手順に署名します（お金は動かず、ネットワーク手数料もかかりません）",
    "seq.relay.2": "署名したリクエストを送ります",
    "seq.relay.3": "execute: 代わりに送り、ネットワーク手数料を払います",
    "seq.relay.4": "コントラクトを呼び出します。送信者はあくまであなたのウォレットです",
    "seq.relay.note":
        "リレイヤーは署名を偽造したり、あなたのお金を動かしたりできません。止まっていたら、少額のPOLで同じ手順を自分で送れます。",

    "item.safety": "起こらないことと、起こりうること",
    "safety.1":
        "管理者も所有者も一時停止ボタンもアップグレードもありません。新しい版は新しいデプロイで、移るかどうかは人が選びます。",
    "safety.2":
        "お金が行くのは、依頼者（返金）、受注者（完了時）、手数料の受取先（完了時のみ）、預かり分を自分で引き出す人だけです。",
    "safety.3":
        "支払い済みの依頼はすべて終わります。評価者の期限で終わるか、どんな場合でも最終期限後の返金で終わります。",
    "safety.4": "支払い後はルールを変えられません。例外は、依頼者が確認期間を一度だけ延ばすことです。",
    "safety.5": "トークン発行元がアドレスを凍結しても依頼は終わり、お金は別のアドレスへ引き出せるよう保管されます。",
    "safety.6": "コードはオープンソースで、まだ外部監査を受けていません。今は1件100 USDCまでです。",
};

const zh: ArchText = {
    "arch.title": "OPUS 如何运作",
    "arch.intro": "从创建托管到付款，各部分按什么顺序彼此交互。点击标题即可查看内容。",
    "arch.expandAll": "全部展开",
    "arch.collapseAll": "全部收起",
    "arch.scroll": "图表可左右滑动查看全部。",

    "actor.client": "委托人",
    "actor.provider": "服务方",
    "actor.service": "服务（例如 WayHand）",
    "actor.factory": "工厂合约",
    "actor.core": "托管实例",
    "actor.evaluator": "评估合约",
    "actor.forwarder": "转发合约",
    "actor.relayer": "中继器",
    "actor.arbiter": "仲裁人",
    "actor.anyone": "任何人（守护者）",
    "actor.treasury": "手续费接收地址",
    "actor.wallet": "你的钱包",

    "item.overview": "总览：谁做什么",
    "overview.intro":
        "OPUS 是一组部署在 Polygon 上的小型合约，在工作完成之前替人保管款项。WayHand 这样的服务建立在它之上，人们用钱包来使用。",
    "layer.portal": "OPUS 门户",
    "layer.portal.body": "服务目录。只负责介绍，不保管资金。",
    "layer.services": "服务，例如 WayHand",
    "layer.services.body": "负责撮合、身份核验、凭证、通知和客服。",
    "layer.offchain": "SDK、中继器、守护者、索引器",
    "layer.offchain.body": "链下的帮手：构造调用、代付网络费、触发期限、读取历史记录。",
    "layer.onchain": "Polygon 上的合约",
    "layer.onchain.body": "工厂、托管实例、评估合约、转发合约。部署后不可更改，没有管理员。",
    "overview.caption": "资金只存在于最底层。",

    "item.parts": "组成部分",
    "part.factory": "工厂合约",
    "part.factory.body": "任何人都可以通过它创建托管实例。它没有所有者。",
    "part.core": "托管实例",
    "part.core.body": "保管每个委托的资金。每种代币和费率设置对应一个实例，费率和接收方永远不能更改。",
    "part.evaluator": "评估合约",
    "part.evaluator.body": "按委托人付款前设定的规则（确认、沉默、异议、裁决）决定委托如何结束。",
    "part.forwarder": "转发合约与中继器",
    "part.forwarder.body": "人只需签名。中继器代为发送，并支付网络费。",
    "part.keeper": "守护者",
    "part.keeper.body": "到期限时按时发起规定的调用。它停止后，任何人都可以发起同样的调用。",
    "part.sdk": "SDK 与索引器",
    "part.sdk.body": "构造调用，核实实际托管的金额，并读取事件用于统计。",
    "part.arbiter": "仲裁人",
    "part.arbiter.body": "出现异议时作出裁决。起初是一个地址，以后是投票的仲裁庭。",

    "item.create": "1. 创建托管实例",
    "create.intro": "由服务方做一次。之后所有操作都使用这个实例。",
    "seq.create.label": "创建托管实例",
    "seq.create.1": "createInstance(代币, 手续费接收地址, 费率%)",
    "seq.create.2": "按这些设置创建实例，设置随即固定",
    "seq.create.3": "实例地址（相同设置总是得到同一个实例）",
    "seq.create.note": "没有管理员。代币、费率和接收方永远不能更改。只有在委托完成时才收取手续费。",

    "item.post": "2. 发布委托并付款到托管",
    "post.intro": "资金直到最后一步才离开委托人的钱包，而且进入的是托管，不是服务方。",
    "seq.post.label": "发布与付款到托管",
    "seq.post.1": "createJob(服务方, 评估合约, 期限, 描述的哈希)",
    "seq.post.2": "setBudget：服务方报的价格",
    "seq.post.3": "configure：确认时间、沉默的含义、仲裁人、评估费",
    "seq.post.4": "fund：报价金额从钱包转入托管（fundWithPermit 会在同一步完成 USDC 授权签名）",
    "seq.post.note": "付款后，服务方、金额、期限和规则都不能再改。目前每个委托最高 100 USDC。",

    "item.complete": "3. 完成与付款",
    "complete.intro": "只有委托完成时，才会向服务方付款并收取服务费。",
    "seq.complete.label": "完成与付款",
    "seq.complete.1": "submit：工作凭证的哈希",
    "seq.complete.2": "approveJob（委托人沉默时，确认期结束后任何人可调用 finalize）",
    "seq.complete.3": "complete",
    "seq.complete.4": "支付金额扣除服务费后的部分",
    "seq.complete.5": "支付服务费",
    "seq.complete.note": "退款或驳回不收手续费。",

    "item.deadlines": "4. 没人回应时：期限",
    "deadlines.intro": "已付款的委托一定会结束。任何人都能发起调用，所以不会因为某一个运营方而卡住。",
    "seq.deadlines.label": "期限与退款",
    "seq.deadlines.a": "到期限服务方仍未提交凭证",
    "seq.deadlines.1": "timeoutNoSubmission",
    "seq.deadlines.2": "reject",
    "seq.deadlines.3": "全额退款",
    "seq.deadlines.b": "凭证已提交，但确认期结束后委托人仍沉默",
    "seq.deadlines.4": "finalize（完成）或 escalateOnSilence（交给仲裁人），按付款前的设置",
    "seq.deadlines.5": "complete：向服务方付款",
    "seq.deadlines.c": "评估合约本身卡住，且最终期限已过",
    "seq.deadlines.6": "claimRefund",
    "seq.deadlines.7": "全额退款",

    "item.dispute": "5. 异议与裁决",
    "dispute.intro": "工作与约定不符时，委托人提出异议。在仲裁人裁决或默认结果生效前，付款会暂停。",
    "seq.dispute.label": "异议与裁决",
    "seq.dispute.1": "object，在确认期内：付款暂停",
    "seq.dispute.2": "postDeposit：双方各交一笔小额争议押金",
    "seq.dispute.3": "案件交给仲裁人",
    "seq.dispute.4": "rule：付款给服务方，或退款给委托人",
    "seq.dispute.5": "complete 或 reject：胜方收款，败方的押金支付给仲裁人",
    "seq.dispute.note":
        "到期没有裁决时，任何人可调用 resolveByDefault，按付款前设定的默认结果处理。委托人随时可以批准，服务方随时可以撤回，争议随即结束。",

    "item.relay": "6. 只签名，不付网络费",
    "relay.intro": "人只需签名。中继器负责发送并支付网络费，所以这些步骤不需要钱包里有 POL。",
    "seq.relay.label": "通过中继器发送一步操作",
    "seq.relay.1": "为这一步签名（不转移资金，也没有网络费）",
    "seq.relay.2": "发送已签名的请求",
    "seq.relay.3": "execute：代为发送并支付网络费",
    "seq.relay.4": "调用合约，发起人仍然是你的钱包",
    "seq.relay.note": "中继器无法伪造签名，也无法动用你的资金。如果它停止服务，放入少量 POL，自己发送同一步即可。",

    "item.safety": "哪些不会发生，哪些可能发生",
    "safety.1": "没有管理员、所有者、暂停按钮，也没有升级。新版本是新的部署，是否迁移由人们自己选择。",
    "safety.2":
        "资金只会流向：委托人（退款）、服务方（完成时）、费用接收方（仅完成时）、或自行提取自己那份保管资金的人。",
    "safety.3": "每个已付款的委托都会结束：要么按评估合约的期限，要么无论如何都会在最终期限后退款。",
    "safety.4": "付款后规则不能更改，唯一例外是委托人可将确认时间延长一次。",
    "safety.5": "如果代币发行方冻结了某个地址，委托仍会结束，资金会保留，可提取到另一个地址。",
    "safety.6": "代码是开源的，尚未经过外部审计。目前每个委托最高 100 USDC。",
};

export const ARCH_TEXT: Record<Locale, ArchText> = { en, ko, ja, zh };
