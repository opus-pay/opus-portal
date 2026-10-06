import { expect } from "chai";

import { LOCALES, MESSAGES, pickLocale, translate } from "../src/lib/i18n";

const slots = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort().join(",");

describe("translations", () => {
    it("gives every language the same keys and the same {slots}", () => {
        const keys = Object.keys(MESSAGES.en);
        for (const locale of LOCALES) {
            expect(Object.keys(MESSAGES[locale]).sort(), locale).to.deep.equal([...keys].sort());
            for (const key of keys)
                expect(slots(MESSAGES[locale][key as keyof (typeof MESSAGES)["en"]]), `${locale} ${key}`).to.equal(
                    slots(MESSAGES.en[key as keyof (typeof MESSAGES)["en"]])
                );
        }
    });

    it("has no empty text", () => {
        for (const locale of LOCALES)
            for (const [key, text] of Object.entries(MESSAGES[locale]))
                expect(text.trim(), `${locale} ${key}`).to.not.equal("");
    });

    it("fills slots and leaves unknown ones", () => {
        expect(translate("en", "card.go", { name: "WayHand" })).to.equal("Go to WayHand");
        expect(translate("ko", "card.go")).to.contain("{name}");
    });

    it("picks the first language the site has, else English", () => {
        expect(pickLocale(["fr-FR", "ja-JP", "en"])).to.equal("ja");
        expect(pickLocale(["zh-Hans-CN"])).to.equal("zh");
        expect(pickLocale(["de", "fr"])).to.equal("en");
        expect(pickLocale([])).to.equal("en");
    });
});
