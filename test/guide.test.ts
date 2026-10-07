import { expect } from "chai";

import { EXCHANGES, FLOWS } from "../src/lib/guide";
import { LOCALES, MESSAGES } from "../src/lib/i18n";

describe("exchange guide", () => {
    it("links exchanges over https with no referral parameters", () => {
        expect(EXCHANGES.map((e) => e.id)).to.deep.equal(["gate", "upbit"]);
        for (const e of EXCHANGES) {
            const url = new URL(e.href);
            expect(url.protocol).to.equal("https:");
            expect(url.search, e.id).to.equal("");
        }
    });

    it("joins every box in a flow with exactly one arrow", () => {
        for (const flow of Object.values(FLOWS)) {
            expect(flow.arrows.length, flow.id).to.equal(flow.nodes.length - 1);
            expect(flow.steps.length, flow.id).to.be.greaterThan(0);
        }
    });

    it("says in every language that a little POL is needed, and to use the Polygon network", () => {
        for (const locale of LOCALES) {
            const m = MESSAGES[locale];
            expect(m["guide.need.pol.body"], locale).to.contain("POL");
            expect(m["guide.home.desc"], locale).to.contain("POL");
            expect(m["guide.safety.network"], locale).to.contain("Polygon");
            expect(m["arrow.sendApp"], locale).to.contain("POL");
        }
    });

    it("mentions the Polygon network in every withdrawal step", () => {
        for (const locale of LOCALES) {
            const m = MESSAGES[locale];
            for (const key of ["guide.gate.s4", "guide.upbit.s3", "guide.out.s1"] as const) {
                expect(m[key], `${locale} ${key}`).to.contain("Polygon");
            }
        }
    });
});
