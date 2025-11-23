/**
 * Defines the size of an element.
 */
export const Size = Object.freeze({

	/**
	 * An extra small size.
	 */
	ExtraSmall: "ExtraSmall",

	/**
	 * A small size.
	 */
	Small: "Small",

	/**
	 * A medium size.
	 */
	Medium: "Medium",

	/**
	 * A large size.
	 */
	Large: "Large",

	/**
	 * An extra large size.
	 */
	ExtraLarge: "ExtraLarge",

	/**
	 * An extra extra large size.
	 */
	ExtraExtraLarge: "ExtraExtraLarge"
});

/**
 * Defines the size of an element.
 */
export type Size = typeof Size[keyof typeof Size];

/**
 * Returns the CSS representation of the specified size.
 * @param size The size.
 * @returns The CSS representation of the specified size.
 */
export function cssClass(size: Size): string {
	switch (size) {
		case Size.ExtraSmall: return "xs";
		case Size.Small: return "sm";
		case Size.Large: return "lg";
		case Size.ExtraLarge: return "xl";
		case Size.ExtraExtraLarge: return "xxl";
		default: return "md";
	}
}
