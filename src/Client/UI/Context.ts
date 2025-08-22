/**
 * Defines contextual modifiers.
 */
export const Context = Object.freeze({

	/**
	 * A danger.
	 */
	Danger: "Danger",

	/**
	 * A warning.
	 */
	Warning: "Warning",

	/**
	 * An information.
	 */
	Info: "Info",

	/**
	 * A success.
	 */
	Success: "Success"
});

/**
 * Defines contextual modifiers.
 */
export type Context = typeof Context[keyof typeof Context];

/**
 * Gets the icon corresponding to the specified context.
 * @param context The context.
 * @returns The icon corresponding to the specified context.
 */
export function getIcon(context: Context): string {
	switch (context) {
		case Context.Danger: return "error";
		case Context.Success: return "check_circle";
		case Context.Warning: return "warning";
		default: return "info";
	}
}

/**
 * Returns the CSS representation of the specified context.
 * @param context The context.
 * @returns The CSS representation of the specified context.
 */
export function toCss(context: Context): string {
	return context.toLowerCase();
}
