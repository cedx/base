/**
 * Specifies the return value of a dialog box.
 */
export const DialogResult = Object.freeze({

	/**
	 * The dialog box does not return any value.
	 */
	None: 0,

	/**
	 * The return value of the dialog box is "OK".
	 */
	OK: 1,

	/**
	 * The return value of the dialog box is "Cancel".
	 */
	Cancel: 2,

	/**
	 * The return value of the dialog box is "Yes".
	 */
	Yes: 3,

	/**
	 * The return value of the dialog box is "No".
	 */
	No: 4,

	/**
	 * The return value of the dialog box is "Abort".
	 */
	Abort: 5,

	/**
	 * The return value of the dialog box is "Retry".
	 */
	Retry: 6,

	/**
	 * The return value of the dialog box is "Ignore".
	 */
	Ignore: 7
});

/**
 * Specifies the return value of a dialog box.
 */
export type DialogResult = typeof DialogResult[keyof typeof DialogResult];
