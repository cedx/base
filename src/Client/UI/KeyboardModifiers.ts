/**
 * Enumerates modifier flags for keyboard accelerators.
 */
export const KeyboardModifiers = Object.freeze({

	/**
	 * Indicates no modifier.
	 */
	None: 0,

	/**
	 * Indicates the `Control` modifier.
	 */
	Ctrl: 1,

	/**
	 * Indicates the `Shift` modifier.
	 */
	Shift: 2,

	/**
	 * Indicates the `Alt` modifier (`Option` key on macOS).
	 */
	Alt: 4,

	/**
	 * Indicates the `Meta` modifier (`Command` key on macOS, `Windows` key on Windows).
	 */
	Meta: 8
});
