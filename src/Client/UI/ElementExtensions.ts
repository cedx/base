/**
 * Creates a document fragment from the specified HTML string.
 * @param html The HTML string providing the child content.
 * @returns The document fragment corresponding to the specified HTML string.
 */
export function createDocumentFragment(html: string): DocumentFragment {
	return document.createRange().createContextualFragment(html);

	const template = document.createElement("template");
	template.innerHTML = html;
	return template.content;
}

/**
 * Creates a document fragment from the specified template literal.
 * @param fragments The string fragments.
 * @param values The interpolated values.
 * @returns The document fragment corresponding to the specified template literal.
 */
export function html(fragments: TemplateStringsArray, ...values: unknown[]): DocumentFragment {
	// const documentFragment = document.createDocumentFragment();
	// for (const node of documentFragment.childNodes)


	const parts = [];
	for (let index = 0; index < values.length; index++) {
		parts.push(fragments[index]);

		const value = values[index];
		if (!(value instanceof DocumentFragment)) parts.push(String(value));
		else {
			const element = document.createElement("div");
			element.appendChild(value);
			parts.push(element.innerHTML);
		}
	}

	parts.push(fragments.at(-1));
	return document.createRange().createContextualFragment(parts.join(""));
}
