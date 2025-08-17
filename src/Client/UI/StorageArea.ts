/**
 * Identifies the web storage area.
 */
export const StorageArea = Object.freeze({

	/**
	 * Indicates the local storage.
	 */
	Local: "Local",

	/**
	 * Indicates the session storage.
	 */
	Session: "Session"
});

/**
 * Identifies the web storage area.
 */
export type StorageArea = typeof StorageArea[keyof typeof StorageArea];
