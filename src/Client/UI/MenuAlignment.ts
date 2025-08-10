/**
 * Defines the alignment of a dropdown menu.
 */
export const MenuAlignment = Object.freeze({

	/**
	 * The dropdown menu is left aligned.
	 */
	Start: "Start",

	/**
	 * The dropdown menu is right aligned.
	 */
	End: "End"
});

/**
 * Defines the alignment of a dropdown menu.
 */
export type MenuAlignment = typeof MenuAlignment[keyof typeof MenuAlignment];
