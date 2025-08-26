import {invalidControl, isFormControl, resetValidity, trimControl} from "@cedx/base/UI/Form.js";
import {assert} from "chai";

/**
 * Tests the features of the form functions.
 */
describe("Form", () => {
	describe("invalidControl()", () => {
		const form = document.createElement("form");
		const input = document.createElement("input");
		const textarea = document.createElement("textarea");
		form.appendChild(input);
		form.appendChild(textarea);

		it("should return the first invalid control if it exists", () => {
			input.setCustomValidity("error");
			textarea.setCustomValidity("");
			assert.equal(invalidControl(form), input);

			input.setCustomValidity("");
			textarea.setCustomValidity("error");
			assert.equal(invalidControl(form), textarea);
		});

		it("should return `null` if all form controls are valid", () => {
			input.setCustomValidity("");
			textarea.setCustomValidity("");
			assert.isNull(invalidControl(form));
		});
	});

	describe("isFormControl()", () => {
		it("should return `true` if the specified element is a form control", () => {
			assert.isTrue(isFormControl(document.createElement("input")));
			assert.isTrue(isFormControl(document.createElement("select")));
			assert.isTrue(isFormControl(document.createElement("textarea")));
		});

		it("should return `false` if the specified element is a not form control", () => {
			assert.isFalse(isFormControl(document.createElement("button")));
			assert.isFalse(isFormControl(document.createElement("div")));
			assert.isFalse(isFormControl(document.createElement("fieldset")));
		});
	});

	describe("resetValidity()", () => {
		it("should reset the validity state of a single form element", () => {
			const input = document.createElement("input");

			input.setCustomValidity("error");
			assert.isFalse(input.checkValidity());

			resetValidity(input);
			assert.isTrue(input.checkValidity());
		});

		it("should reset the validity state of all elements of a form", () => {
			const form = document.createElement("form");

			const input = document.createElement("input");
			input.setCustomValidity("error");
			form.appendChild(input);

			const textarea = document.createElement("textarea");
			textarea.setCustomValidity("error");
			form.appendChild(textarea);

			assert.isFalse(input.checkValidity());
			assert.isFalse(textarea.checkValidity());
			assert.isFalse(form.checkValidity());

			resetValidity(form);
			assert.isTrue(input.checkValidity());
			assert.isTrue(textarea.checkValidity());
			assert.isTrue(form.checkValidity());
		});
	});

	describe("trimControl()", () => {
		it("should trim the value of a single form element", () => {
			const input = document.createElement("input");
			input.value = " \t Foo Bar \r\n ";
			trimControl(input);
			assert.equal(input.value, "Foo Bar");
		});

		it("should trim the value of all elements of a form", () => {
			const form = document.createElement("form");

			const input = document.createElement("input");
			input.value = " \t Foo Bar \r\n ";
			form.appendChild(input);

			const textarea = document.createElement("textarea");
			textarea.value = " \t Baz Qux \r\n ";
			form.appendChild(textarea);

			trimControl(form);
			assert.equal(input.value, "Foo Bar");
			assert.equal(textarea.value, "Baz Qux");
		});
	});
});
