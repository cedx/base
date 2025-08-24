/**
 * Specifies the return value of a message box.
 */
export const MessageBoxResult = Object.freeze({

	/**
	 * The message box does not return any value.
	 */
	None: 0,

	/**
	 * The return value of the message box is "OK".
	 */
	OK: 1,

	/**
	 * The return value of the message box is "Cancel".
	 */
	Cancel: 2,

	/**
	 * The return value of the message box is "Yes".
	 */
	Yes: 3,

	/**
	 * The return value of the message box is "No".
	 */
	No: 4,

	/**
	 * The return value of the message box is "Abort".
	 */
	Abort: 5,

	/**
	 * The return value of the message box is "Retry".
	 */
	Retry: 6,

	/**
	 * The return value of the message box is "Ignore".
	 */
	Ignore: 7
});

/**
 * Specifies the return value of a message box.
 */
export type MessageBoxResult = typeof MessageBoxResult[keyof typeof MessageBoxResult];
