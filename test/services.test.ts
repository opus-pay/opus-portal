import { expect } from "chai";

import { LOCALES, MESSAGES } from "../src/lib/i18n";
import { descKey, isOpen, isWebAddress, nameKey, SERVICES, type Service } from "../src/lib/services";

describe("service list", () => {
    it("names and describes every service in every language", () => {
        for (const locale of LOCALES)
            for (const service of SERVICES) {
                expect(MESSAGES[locale][nameKey(service.id)], `${locale} ${service.id} name`)
                    .to.be.a("string")
                    .and.not.equal("");
                expect(MESSAGES[locale][descKey(service.id)], `${locale} ${service.id} desc`)
                    .to.be.a("string")
                    .and.not.equal("");
            }
    });

    it("lists each service once and starts with WayHand", () => {
        const ids = SERVICES.map((s) => s.id);
        expect(new Set(ids).size).to.equal(ids.length);
        expect(ids[0]).to.equal("wayhand");
    });

    it("lets a visitor open only a live service with a web address", () => {
        const wayhand: Service = { id: "wayhand", status: "live", url: "https://wayhand.example" };
        expect(isOpen(wayhand)).to.equal(true);
        expect(isOpen({ ...wayhand, url: undefined })).to.equal(false);
        expect(isOpen({ ...wayhand, url: "" })).to.equal(false);
        expect(isOpen({ ...wayhand, url: "javascript:alert(1)" })).to.equal(false);
        expect(isOpen({ ...wayhand, status: "planned" })).to.equal(false);
    });

    it("keeps every planned service closed, even if an address is given", () => {
        for (const service of SERVICES.filter((s) => s.status === "planned"))
            expect(isOpen({ ...service, url: "https://example.com" })).to.equal(false);
    });

    it("accepts only http and https addresses", () => {
        expect(isWebAddress("https://a.example/path")).to.equal(true);
        expect(isWebAddress("http://localhost:3100")).to.equal(true);
        expect(isWebAddress("ftp://a.example")).to.equal(false);
        expect(isWebAddress("not a url")).to.equal(false);
        expect(isWebAddress(undefined)).to.equal(false);
    });
});
