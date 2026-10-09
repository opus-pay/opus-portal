import { expect } from "chai";

import { ITEMS, SEQUENCES, textKeys } from "../src/lib/architecture";
import { ARCH_TEXT } from "../src/lib/architecture-text";
import { LOCALES } from "../src/lib/i18n";
import { COLUMN, layoutSequence, wrapText } from "../src/lib/sequence";

describe("architecture document", () => {
    it("has every word in all four languages, and no word that nothing uses", () => {
        const used = textKeys();
        for (const locale of LOCALES) {
            const text = ARCH_TEXT[locale] as Record<string, string>;
            for (const key of used) expect(text[key], `${locale} ${key}`).to.be.a("string").and.not.equal("");
            const extra = Object.keys(text).filter((k) => !used.includes(k) && !k.startsWith("arch."));
            expect(extra, locale).to.deep.equal([]);
        }
    });

    it("keeps the same {slots} and function names in every language", () => {
        for (const key of Object.keys(ARCH_TEXT.en)) {
            const names = (text: string) => (text.match(/\b[a-z]+[A-Z]\w*\b/g) ?? []).sort();
            for (const locale of LOCALES) {
                expect(names((ARCH_TEXT[locale] as Record<string, string>)[key]), `${locale} ${key}`).to.deep.equal(
                    names((ARCH_TEXT.en as Record<string, string>)[key])
                );
            }
        }
    });

    it("has the items in a fixed order, each with something to show", () => {
        expect(ITEMS.map((i) => i.id)).to.deep.equal([
            "overview",
            "parts",
            "create",
            "post",
            "complete",
            "deadlines",
            "dispute",
            "relay",
            "safety",
        ]);
        for (const item of ITEMS) expect(item.blocks.length, item.id).to.be.greaterThan(0);
    });

    it("draws six sequence diagrams whose arrows point at parties that exist", () => {
        expect(Object.keys(SEQUENCES)).to.have.length(6);
        for (const [name, spec] of Object.entries(SEQUENCES)) {
            for (const step of spec.steps) {
                expect(step.from, name).to.be.within(0, spec.actors.length - 1);
                expect(step.to, name).to.be.within(0, spec.actors.length - 1);
            }
        }
    });
});

describe("sequence layout", () => {
    it("wraps Latin text at spaces and wide text anywhere, and never returns nothing", () => {
        expect(wrapText("short", 200)).to.deep.equal(["short"]);
        expect(wrapText("one two three four five six seven eight", 90).length).to.be.greaterThan(1);
        expect(wrapText("没有管理员代币费率和接收方永远不能更改", 80).length).to.be.greaterThan(1);
        expect(wrapText("", 80)).to.deep.equal([""]);
    });

    it("puts the rows in order, inside the picture, for every diagram in every language", () => {
        for (const locale of LOCALES) {
            const text = ARCH_TEXT[locale] as Record<string, string>;
            for (const [name, spec] of Object.entries(SEQUENCES)) {
                const layout = layoutSequence(
                    spec.actors.map((a) => text[`actor.${a}`]),
                    spec.steps.map((s) => ({ ...s, text: text[s.text] }))
                );
                expect(layout.width, name).to.equal(spec.actors.length * COLUMN);
                let last = layout.headerHeight;
                for (const row of layout.rows) {
                    const y = row.y;
                    expect(y, `${locale} ${name}`).to.be.greaterThan(last - 1);
                    last = y;
                    if (row.k === "note") expect(row.x + row.width, `${locale} ${name}`).to.be.at.most(layout.width);
                    else expect(Math.max(row.x1, row.x2), `${locale} ${name}`).to.be.at.most(layout.width);
                }
                expect(layout.height, `${locale} ${name}`).to.be.greaterThan(last);
            }
        }
    });
});
