import {round} from "@cedx/base/Number.js";
import {assert} from "chai";

/**
 * Tests the features of the number functions.
 */
describe("Number", () => {
	describe("round()", () => {
		it("should round the specified value to the given precision", () => {
			assert.equal(round(123.456, 0), 123);
			assert.equal(round(123.456, 1), 123.5);
			assert.equal(round(123.456, 2), 123.46);
		});
	});
});
