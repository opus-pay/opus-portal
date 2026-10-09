import { expect } from "chai";

import {
    LOCALES,
    MESSAGES,
    addressWithLanguage,
    choiceCookie,
    initialLocale,
    readCookie,
    translate,
} from "../src/lib/i18n";

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

    it("starts in the address's language, else the last choice, else the browser's, else English", () => {
        expect(initialLocale("ko", "ja", ["zh-CN"])).to.equal("ko");
        expect(initialLocale(null, "ja", ["zh-CN"])).to.equal("ja");
        expect(initialLocale(null, null, ["fr-FR", "ko-KR"])).to.equal("ko");
        expect(initialLocale(null, null, ["zh-TW"])).to.equal("zh");
        expect(initialLocale(null, null, ["de"])).to.equal("en");
        expect(initialLocale(null, null)).to.equal("en");
        expect(initialLocale(undefined, undefined, [])).to.equal("en");
        // A value that is not a language of the site (an old or edited entry) is ignored, so the next step decides.
        expect(initialLocale("fr", "de", ["ja"])).to.equal("ja");
        expect(initialLocale("", "", [])).to.equal("en");
    });

    it("keeps the chosen language in a cookie that is read back", () => {
        const text = choiceCookie("opus_locale", "ko", true);
        expect(text).to.contain("opus_locale=ko").and.to.contain("Path=/").and.to.contain("SameSite=Lax");
        expect(text).to.contain("Secure").and.to.contain("Max-Age=31536000");
        expect(choiceCookie("opus_locale", "ko", false)).to.not.contain("Secure");
        expect(readCookie("a=1; opus_locale=ja; b=2", "opus_locale")).to.equal("ja");
        expect(readCookie("a=1", "opus_locale")).to.equal(null);
        expect(readCookie("opus_locale=%E0%A4%A", "opus_locale")).to.equal(null);
        expect(readCookie("xopus_locale=ja", "opus_locale")).to.equal(null);
    });

    it("puts a language chosen with the control into the address, only when the address has one", () => {
        expect(addressWithLanguage("https://www.opusportal.org/?lang=ko", "en")).to.equal(
            "https://www.opusportal.org/?lang=en"
        );
        expect(addressWithLanguage("https://x.app/post?a=1&lang=ja#top", "zh")).to.equal(
            "https://x.app/post?a=1&lang=zh#top"
        );
        expect(addressWithLanguage("https://www.opusportal.org/", "en")).to.equal(null);
        expect(addressWithLanguage("not an address", "en")).to.equal(null);
    });
});
