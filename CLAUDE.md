# OPUS Portal 작업 안내 (Claude용)

OPUS 에스크로 위의 서비스를 모아 보여 주는 **정적 사이트**입니다. 먼저 `README.md`를 읽으세요. 규칙과 배경은 `../opus-osx`의 `ROADMAP.md`(D24, M12)와 `GITHUB_ISSUES.md`(Milestone 12, #62~#66)에 있습니다.

## 사용자와 소통

-   사용자는 한국인 1인 창업자입니다. **보고와 질문은 한국어로**, 쉬운 말로 합니다. 결정이 필요한 곳(정책, 되돌리기 어려운 일)에서만 멈추고 묻습니다.
-   GitHub 푸시와 PR은 사용자가 요청할 때만 합니다. 비밀값(`.env*`)은 읽지 않고 커밋하지 않습니다.

## 지켜야 할 것

-   **중립:** 포털은 서비스를 나열할 뿐 사람을 연결하지 않고, 돈을 맡지 않고, 특별한 권한이 없습니다 (D24). 팀 서비스(WayHand)를 위에 고정하거나 순위를 사지 않습니다. WayHand의 수익·정책 코드를 넣지 않습니다.
-   **정적 사이트:** 서버 코드, 비밀 키, 사용자 데이터 저장을 넣지 않습니다 (`output: "export"`). 지갑은 연결만 하고 서명·거래를 요청하지 않습니다.
-   **준비 중 서비스는 선택되지 않게:** 링크가 되려면 `status: "live"`이고 주소가 http(s)여야 합니다 (`isOpen`).
-   **4개 언어:** `src/lib/i18n.ts`의 en/ko/ja/zh는 같은 키와 같은 `{슬롯}`을 가져야 합니다 (테스트가 검사). 새 서비스는 이름과 설명을 네 언어로 씁니다.
-   **반응형:** 휴대폰(360~390px)과 PC(1280px) 모두 확인합니다.
-   **Next.js:** 이 버전은 알던 것과 다를 수 있습니다. 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 해당 안내를 읽으세요.

## 명령

```bash
yarn dev                 # http://localhost:3200
yarn test                # mocha + chai
yarn lint                # 타입 검사
yarn formatting:check    # Prettier (formatting:write로 고침)
yarn build               # out/
```

커밋 전에 `yarn formatting:check && yarn lint && yarn test && yarn build`가 통과해야 합니다. 커밋 메시지는 영어, 명령형 제목(`feat: ...`)과 "왜"를 설명하는 본문.
