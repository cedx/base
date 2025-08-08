/**
 * Enumerates different themes an operating system or application can show.
 */
export const AppTheme = Object.freeze({

	/**
	 * The system predefined theme mode.
	 */
	System: "System",

	/**
	 * The light predefined theme mode.
	 */
	Light: "Light",

	/**
	 * The dark predefined theme mode.
	 */
	Dark: "Dark"
});

/**
 * Enumerates different themes an operating system or application can show.
 */
export type AppTheme = typeof AppTheme[keyof typeof AppTheme];

/**
 * Gets the icon corresponding to the specified theme.
 * @param theme The application theme.
 * @returns The icon corresponding to the specified theme.
 */
export function getIcon(theme: AppTheme): string {
	switch (theme) {
		case AppTheme.Dark: return "dark_mode";
		case AppTheme.Light: return "light_mode";
		default: return "contrast";
	}
}

/**
 * Gets the label corresponding to the specified theme.
 * @param theme The application theme.
 * @returns The label corresponding to the specified theme.
 */
export function getLabel(theme: AppTheme): string {
	switch (theme) {
		case AppTheme.Dark: return "Sombre";
		case AppTheme.Light: return "Clair";
		default: return "Auto";
	}
}
