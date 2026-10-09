import { expect } from "chai";

import { LOCALES, MESSAGES, initialLocale, translate } from "../src/lib/i18n";

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

    it("starts in English, or in the language the reader chose last time", () => {
        expect(initialLocale(null)).to.equal("en");
        expect(initialLocale(undefined)).to.equal("en");
        expect(initialLocale("ko")).to.equal("ko");
        expect(initialLocale("zh")).to.equal("zh");
        // A value that is not a language of the site (an old or edited entry) falls back to English.
        expect(initialLocale("fr")).to.equal("en");
        expect(initialLocale("")).to.equal("en");
    });
});
