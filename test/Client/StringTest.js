import {capitalize, newLineToBr, reverse, split, stripTags, truncate} from "@cedx/base/String.js";
import {assert} from "chai";

/**
 * Tests the features of the string functions.
 */
describe("String", () => {
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
});
