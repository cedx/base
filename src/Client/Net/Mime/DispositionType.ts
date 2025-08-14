/**
 * Provides the strings used to specify the disposition type.
 */
export const DispositionType = Object.freeze({

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
export type DispositionType = typeof DispositionType[keyof typeof DispositionType];
