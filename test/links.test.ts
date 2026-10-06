import { expect } from "chai";

import { footerLinks, listingContact } from "../src/lib/links";

describe("footer links", () => {
    it("points at the OPUS repository by default", () => {
        const links = footerLinks("en", {});
        expect(links.github).to.equal("https://github.com/opus-pay");
        expect(links.whitepaper).to.equal("https://github.com/opus-pay/opus-osx/blob/main/WHITEPAPER.md");
        expect(links.architecture).to.equal(`${links.whitepaper}#5-architecture`);
    });

    it("gives Korean readers the Korean whitepaper", () => {
        const links = footerLinks("ko", {});
        expect(links.whitepaper).to.equal("https://github.com/opus-pay/opus-osx/blob/main/WHITEPAPER.ko.md");
        expect(links.architecture).to.equal(links.whitepaper);
    });

    it("takes addresses from the settings and drops a trailing slash", () => {
        const links = footerLinks("ja", {
            NEXT_PUBLIC_DOCS_URL: "https://docs.example/main/",
            NEXT_PUBLIC_GITHUB_URL: "https://git.example/org/",
        });
        expect(links.whitepaper).to.equal("https://docs.example/main/WHITEPAPER.md");
        expect(links.github).to.equal("https://git.example/org");
        expect(footerLinks("en", { NEXT_PUBLIC_DOCS_URL: "  " }).whitepaper).to.contain("opus-osx");
    });
});

describe("listing contact", () => {
    it("is a mail link only when a real e-mail address is set", () => {
        expect(listingContact({ NEXT_PUBLIC_CONTACT_EMAIL: "hello@example.com" })).to.equal(
            "mailto:hello@example.com?subject=OPUS%20Portal%20listing"
        );
        expect(listingContact({})).to.equal(undefined);
        expect(listingContact({ NEXT_PUBLIC_CONTACT_EMAIL: "  " })).to.equal(undefined);
        expect(listingContact({ NEXT_PUBLIC_CONTACT_EMAIL: "not an email" })).to.equal(undefined);
        expect(listingContact({ NEXT_PUBLIC_CONTACT_EMAIL: 'a@b.com"><script>' })).to.equal(undefined);
    });
});
