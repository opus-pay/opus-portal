import { expect } from "chai";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Accordion } from "../src/components/accordion";

const render = (open?: boolean) =>
    renderToStaticMarkup(
        createElement(Accordion, { id: "x", title: "The title", defaultOpen: open, children: "The text" })
    );

describe("accordion", () => {
    it("shows only the title until it is pressed", () => {
        const html = render();
        expect(html).to.contain("The title");
        expect(html).to.not.contain("The text");
        expect(html).to.contain('aria-expanded="false"');
    });

    it("shows the text below the title when it starts open", () => {
        const html = render(true);
        expect(html).to.contain("The title");
        expect(html).to.contain("The text");
        expect(html).to.contain('aria-expanded="true"');
        expect(html.indexOf("The title")).to.be.lessThan(html.indexOf("The text"));
    });

    it("can be a link target", () => {
        expect(render()).to.contain('id="x"');
    });
});
