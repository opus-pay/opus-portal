import { expect } from "chai";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("links", () => {
    it("open in the current window: no link asks for a new window or tab", () => {
        const files = ["src/components", "app"].flatMap((dir) =>
            readdirSync(dir, { recursive: true, encoding: "utf8" })
                .filter((f) => f.endsWith(".tsx"))
                .map((f) => join(dir, f))
        );
        expect(files.length).to.be.greaterThan(10);
        for (const file of files) {
            const source = readFileSync(file, "utf8");
            expect(source, file).to.not.match(/target\s*[=:]\s*["']?\{?\s*["']?_blank|window\.open\(/);
        }
    });
});
