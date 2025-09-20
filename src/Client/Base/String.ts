/**
 * Converts the first character to uppercase.
 * @param value The string to process.
 * @param culture The current culture.
 * @returns The processed string.
 */
export function capitalize(value: string, culture: Intl.Locale|string = navigator.language): string {
	return value.charAt(0).toLocaleUpperCase(culture) + value.slice(1);
}

/**
 * Replaces all new lines in the specified value by HTML line breaks.
 * @param value The string to format.
 * @param options Value indicating whether to use XHTML compatible line breaks.
 * @returns The formatted string.
 */
export function newLineToBr(value: string, options: {xhtml?: boolean} = {}): string {
	return value.split(/\r?\n/g).join(options.xhtml ? "<br />" : "<br>");
}

/**
 * Reverses the specified string.
 * @param value The string to reverse.
 * @returns The reversed string.
 */
export function reverse(value: string): string {
	return Array.from(value).reverse().join("");
}

/**
 * Converts a string to an array.
 * @param value The string to split into characters or chunks.
 * @param splitLength The maximum length of the chunks.
 * @returns An array whose elements contain the characters or chunks.
 */
export function split(value: string, splitLength = 1): string[] {
	return splitLength == 1 ? Array.from(value) : (value.match(new RegExp(`.{1,${splitLength}}`, "gsy")) ?? []);
}

/**
 * Removes the HTML tags from the specified string.
 * @param value The string to process.
 * @returns The processed string.
 */
export function stripTags(value: string): string {
	return value.replace(/<[^>]+>/g, "");
}

/**
 * Truncates the specified string to the given number of characters.
 * @param value The string to be truncated.
 * @param length The maximum length.
 * @param ellipsis The ellipsis to append to the truncated text.
 * @returns The truncated string.
 */
export function truncate(value: string, length: number, ellipsis = "..."): string {
	return value.length > length ? value.slice(0, length) + ellipsis : value;
}
