/**
 * Defines the alignment of a component.
 */
export const Alignment = Object.freeze({

	/**
	 * The element is aligned at the start.
	 */
	Start: "Start",

	/**
	 * The element is aligned in the center.
	 */
	Center: "Center",

	/**
	 * The element is aligned at the end.
	 */
	End: "End"
});

/**
 * Defines the alignment of a component.
 */
export type Alignment = typeof Alignment[keyof typeof Alignment];
