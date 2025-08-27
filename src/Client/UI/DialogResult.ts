/**
 * Specifies common return values of a dialog box.
 */
export const DialogResult = Object.freeze({

	/**
	 * The dialog box does not return any value.
	 */
	None: "",

	/**
	 * The return value of the dialog box is "OK".
	 */
	OK: "OK",

	/**
	 * The return value of the dialog box is "Cancel".
	 */
	Cancel: "Cancel",

	/**
	 * The return value of the dialog box is "Abort".
	 */
	Abort: "Abort",

	/**
	 * The return value of the dialog box is "Retry".
	 */
	Retry: "Retry",

	/**
	 * The return value of the dialog box is "Ignore".
	 */
	Ignore: "Ignore"
});

/**
 * Specifies the return value of a dialog box.
 */
export type DialogResult = typeof DialogResult[keyof typeof DialogResult];
