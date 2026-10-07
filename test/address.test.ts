import { expect } from "chai";

import { LOCALE_NAMES } from "../src/lib/i18n";
import { displayAddress, shortAddress } from "../src/lib/wallets";

// The first account of the public test mnemonic; the checksum spelling is what every OPUS screen shows.
const CHECKSUM = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

describe("how an address is shown", () => {
    it("always uses the checksum spelling, whatever case it arrives in", () => {
        expect(displayAddress(CHECKSUM.toLowerCase())).to.equal(CHECKSUM);
        expect(displayAddress(CHECKSUM)).to.equal(CHECKSUM);
        expect(displayAddress("0x" + CHECKSUM.slice(2).toUpperCase())).to.equal(CHECKSUM);
    });

    it("shortens to the first 6 and the last 4 characters of that spelling", () => {
        expect(shortAddress(CHECKSUM.toLowerCase())).to.equal("0xf39F…2266");
        expect(shortAddress(CHECKSUM)).to.equal("0xf39F…2266");
    });

    it("leaves what is not an address alone", () => {
        expect(shortAddress("0x123")).to.equal("0x123");
        expect(displayAddress("not an address")).to.equal("not an address");
    });
});

describe("language names", () => {
    it("match WayHand's, so the same language reads the same on both", () => {
        expect(LOCALE_NAMES).to.deep.equal({ en: "English", ko: "한국어", ja: "日本語", zh: "简体中文" });
    });
});
