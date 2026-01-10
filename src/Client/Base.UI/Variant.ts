import {Context} from "./Context.js";

/**
 * Defines tone variants.
 */
export const Variant = Object.freeze({
	...Context,

	/**
	 * A primary tone.
	 */
	Primary: "Primary",

	/**
	 * A secondary tone.
	 */
	Secondary: "Secondary",

	/**
	 * A light tone.
	 */
	Light: "Light",

	/**
	 * A dark tone.
	 */
	Dark: "Dark"
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
export function cssClass(variant: Variant): string {
	return variant.toLowerCase();
}
