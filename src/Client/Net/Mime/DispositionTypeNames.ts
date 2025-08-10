/**
 * Provides the strings used to specify the disposition type.
 */
export const DispositionTypeNames = Object.freeze({

	/**
	 * The `attachment` disposition type.
	 */
	Attachment: "attachment",

	/**
	 * The `inline` disposition type.
	 */
	Inline: "inline"
});

/**
 * Provides the strings used to specify the disposition type.
 */
export type DispositionTypeNames = typeof DispositionTypeNames[keyof typeof DispositionTypeNames];
