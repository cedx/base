import * as NumberExtensions from "@cedx/base/NumberExtensions.js";
import {assert} from "chai";

/**
 * Tests the features of the number extensions.
 */
describe("NumberExtensions", () => {
	describe("round()", () => {
		it("should round the specified value to the given precision", () => {
			assert.equal(NumberExtensions.round(123.456, 0), 123);
			assert.equal(NumberExtensions.round(123.456, 1), 123.5);
			assert.equal(NumberExtensions.round(123.456, 2), 123.46);
		});
	});
});
