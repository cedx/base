/**
 * Defines tone variants.
 */
export const Variant = Object.freeze({

	/**
	 * A dark variant.
	 */
	Dark: "Dark",

	/**
	 * A light variant.
	 */
	Light: "Light",

	/**
	 * A primary variant.
	 */
	Primary: "Primary",

	/**
	 * A secondary variant.
	 */
	Secondary: "Secondary"
});

/**
 * Defines tone variants.
 */
export type Variant = typeof Variant[keyof typeof Variant];

/**
 * Returns the CSS representation of the specified variant.
 * @param variant The variant.
 * @returns The CSS representation of the specified variant.
 */
export function toCss(variant: Variant): string {
	return variant.toLowerCase();
}
