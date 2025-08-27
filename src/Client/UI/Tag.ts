/**
 * Creates a CSS stylesheet from the specified template literal.
 * @param fragments The string fragments.
 * @param values The interpolated values.
 * @returns The CSS stylesheet corresponding to the specified template literal.
 */
export function css(fragments: TemplateStringsArray, ...values: unknown[]): CSSStyleSheet {
	const styleSheet = new CSSStyleSheet;
	styleSheet.replaceSync(fragments.length == 1 ? fragments[0] : values.reduce(
		(fragment: string, value: unknown, index: number) => fragment + stringFromCss(value) + fragments[index + 1],
		fragments[0]
	));

	return styleSheet;
}

/**
 * Creates a document fragment from the specified template literal.
 * @param fragments The string fragments.
 * @param values The interpolated values.
 * @returns The document fragment corresponding to the specified template literal.
 */
export function html(fragments: TemplateStringsArray, ...values: unknown[]): DocumentFragment {
	return document.createRange().createContextualFragment(fragments.length == 1 ? fragments[0] : values.reduce(
		(fragment: string, value: unknown, index: number) => fragment + stringFromHtml(value) + fragments[index + 1],
		fragments[0]
	));
}

/**
 * Converts the specified value to a CSS string.
 * @param value A value representing a CSS fragment.
 * @returns The CSS string corresponding to the specified value.
 */
function stringFromCss(value: unknown): string {
	if (!(value instanceof CSSStyleSheet)) {
		if (Array.isArray(value)) return value.map(stringFromCss).join("\n");
		return value === null || typeof value == "undefined" ? "" : String(value); // eslint-disable-line @typescript-eslint/no-base-to-string
	}

	return Array.from(value.cssRules).map(cssRule => cssRule.cssText).join("\n");
}

/**
 * Converts the specified value to an HTML string.
 * @param value A value representing an HTML fragment.
 * @returns The HTML string corresponding to the specified value.
 */
function stringFromHtml(value: unknown): string {
	if (!(value instanceof DocumentFragment)) {
		if (Array.isArray(value)) return value.map(stringFromHtml).join("");
		return value === null || typeof value == "undefined" ? "" : String(value); // eslint-disable-line @typescript-eslint/no-base-to-string
	}

	const element = document.createElement("div");
	element.appendChild(value);
	return element.innerHTML;
}
