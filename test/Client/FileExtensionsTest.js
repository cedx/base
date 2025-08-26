import {toDataUrl} from "@cedx/base/FileExtensions.js";
import {assert} from "chai";

/**
 * Tests the features of the file extensions.
 */
describe("FileExtensions", () => {
	describe("toDataUrl()", () => {
		it("should convert the specified file to a data URL", async () => {
			const file = new File(["Hello World!"], "hello.txt", {type: "text/plain"});
			assert.equal((await toDataUrl(file)).href, "data:text/plain;base64,SGVsbG8gV29ybGQh");
		});
	});
});
