import {capitalize, newLineToBr, reverse, split, stripTags, trimArray, trimObject, truncate, xmlEscape} from "@cedx/base/StringExtensions.js";
import {assert} from "chai";

/**
 * Tests the features of the string extensions.
 */
describe("StringExtensions", () => {
	const locale = "en-US";

	describe("capitalize()", () => {
		it("should convert in uppercase the first character of the specified string", () => {
			assert.equal(capitalize("", locale), "");
			assert.equal(capitalize("foo bAr baZ", locale), "Foo bAr baZ");
		});
	});

	describe("newLineToBr()", () => {
		it("should replace all new lines by HTML line breaks", () => {
			assert.equal(newLineToBr(""), "");
			assert.equal(newLineToBr("foo isn't\r\n bar"), "foo isn't<br> bar");
		});
	});

	describe("reverse()", () => {
		it("should reverse the characters of the specified string", () => {
			assert.equal(reverse(""), "");
			assert.equal(reverse("foo bar"), "rab oof");
			assert.equal(reverse("Cédric"), "cirdéC");
		});
	});

	describe("split()", () => {
		it("should split the string into chunks of the specified length", () => {
			assert.deepEqual(split(""), []);
			assert.deepEqual(split("héhé", 1), ["h", "é", "h", "é"]);
			assert.deepEqual(split("foo", 2), ["fo", "o"]);
			assert.deepEqual(split("foobar", 3), ["foo", "bar"]);
			assert.deepEqual(split("foo", 4), ["foo"]);
		});
	});

	describe("stripTags()", () => {
		it("should remove the HTML tags from the specified string", () => {
			assert.equal(stripTags(""), "");
			assert.equal(stripTags("> foo / bar <"), "> foo / bar <");
			assert.equal(stripTags('<p>Test paragraph.</p><!-- Comment --> <a href="#fragment">Other text</a>.'), "Test paragraph. Other text.");
		});
	});

	describe("trimArray()", () => {
		it("should trim the items of the specified array", () => {
			/** @type {unknown[]} */
			let array = [];
			assert.deepEqual(trimArray(array), []);

			array = [123, " foo ", 456, "  bar  "];
			assert.deepEqual(trimArray(array), [123, "foo", 456, "bar"]);
		});
	});

	describe("trimObject()", () => {
		it("should trim the properties of the specified object", () => {
			/** @type {Record<string, unknown>} */
			let object = {};
			assert.deepEqual(trimObject(object), {});

			object = {prop1: 123, prop2: " foo ", prop3: 456, prop4: "  bar  "};
			assert.deepEqual(trimObject(object), {prop1: 123, prop2: "foo", prop3: 456, prop4: "bar"});
		});
	});

	describe("truncate()", () => {
		it("should truncate the string to the specified length", () => {
			assert.equal(truncate("", 0), "");
			assert.equal(truncate("foo bar", 7), "foo bar");
			assert.equal(truncate("foo bar", 0), "...");
			assert.equal(truncate("foo bar", 4), "foo ...");
		});

		it("should append the specified ellipsis to the truncated string", () => {
			assert.equal(truncate("foo bar", 0, "--"), "--");
			assert.equal(truncate("foo bar", 4, "--"), "foo --");
		});
	});

	describe("xmlEscape()", () => {
		it("should replace invalid XML characters with their valid XML equivalent", () => {
			assert.equal(xmlEscape(""), "");
			assert.equal(xmlEscape('"Hey!"'), "&quot;Hey!&quot;");
			assert.equal(xmlEscape(" <foo> & <bar> "), " &lt;foo&gt; &amp; &lt;bar&gt; ");
		});
	});
});
