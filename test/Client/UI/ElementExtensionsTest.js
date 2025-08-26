import {css, html} from "@cedx/base/UI/ElementExtensions.js";
import {assert} from "chai";

/**
 * Tests the features of the element extensions.
 */
describe.only("ElementExtensions", () => {
	describe("css()", () => {
		it("should create a CSS stylesheet", () => {
			const cssStyleSheet = css`p { display: block; } /* A comment. */ button.btn { color: black; }`;
			assert.instanceOf(cssStyleSheet, CSSStyleSheet);
			assert.lengthOf(cssStyleSheet.cssRules, 2);

			const {cssRules} = cssStyleSheet;
			assert.equal(cssRules.item(0)?.cssText, "p { display: block; }");
			assert.equal(cssRules.item(1)?.cssText, "button.btn { color: black; }");
		});

		it("should support nested CSS stylesheets", () => {
			const cssStyleSheet = css`${css`p { display: block; }`} /* A comment. */ ${css`button.btn { color: black; }`}`;
			assert.instanceOf(cssStyleSheet, CSSStyleSheet);
			assert.lengthOf(cssStyleSheet.cssRules, 2);

			const {cssRules} = cssStyleSheet;
			assert.equal(cssRules.item(0)?.cssText, "p { display: block; }");
			assert.equal(cssRules.item(1)?.cssText, "button.btn { color: black; }");
		});
	});

	describe("html()", () => {
		it("should create a document fragment", () => {
			const documentFragment = html`<p>Hello World!</p> <!-- A comment. --> <button class="btn">OK</button>`;
			assert.instanceOf(documentFragment, DocumentFragment);
			assert.lengthOf(documentFragment.childNodes, 5);

			const paragraph = documentFragment.childNodes.item(0);
			assert.instanceOf(paragraph, HTMLParagraphElement);
			assert.equal(paragraph.textContent, "Hello World!");

			const button = documentFragment.childNodes.item(4);
			assert.instanceOf(button, HTMLButtonElement);
			assert.equal(button.className, "btn");
		});

		it("should support nested document fragments", () => {
			const documentFragment = html`${html`<p>Hello World!</p>`} <!-- A comment. --> ${html`<button class="btn">OK</button>`}`;
			assert.instanceOf(documentFragment, DocumentFragment);
			assert.lengthOf(documentFragment.childNodes, 5);

			const {childNodes} = documentFragment;
			assert.instanceOf(childNodes.item(0), HTMLParagraphElement);
			assert.instanceOf(childNodes.item(2), Comment);
			assert.instanceOf(childNodes.item(4), HTMLButtonElement);
		});
	});
});
