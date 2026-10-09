import { expect } from "chai";

import { LOCALES, MESSAGES } from "../src/lib/i18n";
import { descKey, isOpen, isWebAddress, SERVICES, serviceAddress, type Service } from "../src/lib/services";

describe("service list", () => {
    it("describes every service in every language", () => {
        for (const locale of LOCALES)
            for (const service of SERVICES)
                expect(MESSAGES[locale][descKey(service.id)], `${locale} ${service.id}`)
                    .to.be.a("string")
                    .and.not.equal("");
    });

    it("has no description left over for a service that is gone", () => {
        const wanted = SERVICES.map((s) => descKey(s.id)).sort();
        for (const locale of LOCALES)
            expect(
                Object.keys(MESSAGES[locale])
                    .filter((k) => k.startsWith("service."))
                    .sort(),
                locale
            ).to.deep.equal(wanted);
    });

    it("lists each service once, with a name, and starts with WayHand", () => {
        const ids = SERVICES.map((s) => s.id);
        expect(new Set(ids).size).to.equal(ids.length);
        expect(ids[0]).to.equal("wayhand");
        for (const service of SERVICES) expect(service.name.trim(), service.id).to.not.equal("");
    });

    it("keeps WayHand the only active service, and the other two planned", () => {
        expect(SERVICES.filter((s) => s.status === "active").map((s) => s.id)).to.deep.equal(["wayhand"]);
        expect(SERVICES.filter((s) => s.status === "planned")).to.have.length(2);
    });

    it("opens WayHand at www.wayhand.app unless the build says otherwise", () => {
        expect(SERVICES[0].href).to.equal(process.env.NEXT_PUBLIC_WAYHAND_URL?.trim() || "https://www.wayhand.app");
        expect(isOpen(SERVICES[0])).to.equal(true);
    });

    it("lets a visitor open only an active service with a web address", () => {
        const wayhand: Service = { id: "wayhand", name: "WayHand", status: "active", href: "https://www.wayhand.app" };
        expect(isOpen(wayhand)).to.equal(true);
        expect(isOpen({ ...wayhand, href: undefined })).to.equal(false);
        expect(isOpen({ ...wayhand, href: "" })).to.equal(false);
        expect(isOpen({ ...wayhand, href: "#" })).to.equal(false);
        expect(isOpen({ ...wayhand, href: "javascript:alert(1)" })).to.equal(false);
        expect(isOpen({ ...wayhand, status: "planned" })).to.equal(false);
    });

    it("keeps every planned service closed, even if an address is given", () => {
        for (const service of SERVICES.filter((s) => s.status === "planned"))
            expect(isOpen({ ...service, href: "https://example.com" })).to.equal(false);
    });

    it("accepts only http and https addresses", () => {
        expect(isWebAddress("https://a.example/path")).to.equal(true);
        expect(isWebAddress("http://localhost:3100")).to.equal(true);
        expect(isWebAddress("ftp://a.example")).to.equal(false);
        expect(isWebAddress("not a url")).to.equal(false);
        expect(isWebAddress(undefined)).to.equal(false);
    });

    it("opens a service in the reader's language, keeping what is already in its address", () => {
        const base = { id: "wayhand", name: "WayHand", status: "active" } as const;
        expect(serviceAddress({ ...base, href: "https://www.wayhand.app" }, "ko")).to.equal(
            "https://www.wayhand.app/?lang=ko"
        );
        expect(serviceAddress({ ...base, href: "https://x.example/app?ref=1" }, "ja")).to.equal(
            "https://x.example/app?ref=1&lang=ja"
        );
        expect(serviceAddress({ ...base, href: "https://x.example/?lang=en" }, "zh")).to.equal(
            "https://x.example/?lang=zh"
        );
        expect(serviceAddress({ ...base, status: "planned" }, "ko")).to.equal(undefined);
        expect(serviceAddress({ ...base, href: "javascript:alert(1)" }, "ko")).to.equal("javascript:alert(1)");
    });
});
