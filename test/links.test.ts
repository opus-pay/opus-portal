import { expect } from "chai";

import { footerLinks } from "../src/lib/links";

describe("footer links", () => {
    it("points at the OPUS repository by default", () => {
        expect(footerLinks({}).github).to.equal("https://github.com/opus-pay");
    });

    it("takes the address from the settings and drops a trailing slash", () => {
        expect(footerLinks({ NEXT_PUBLIC_GITHUB_URL: "https://git.example/org/" }).github).to.equal(
            "https://git.example/org"
        );
        expect(footerLinks({ NEXT_PUBLIC_GITHUB_URL: "  " }).github).to.equal("https://github.com/opus-pay");
    });
});
