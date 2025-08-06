/**
 * Defines the available theme modes.
 */
export const ThemeMode = Object.freeze({

	/**
	 * The light predefined theme mode.
	 */
	Light: "Light",

	/**
	 * The dark predefined theme mode.
	 */
	Dark: "Dark",

	/**
	 * The system predefined theme mode.
	 */
	System: "System"
});

/**
 * Defines the available theme modes.
 */
export type ThemeMode = typeof ThemeMode[keyof typeof ThemeMode];

/**
 * Gets the icon corresponding to the specified theme.
 * @param themeMode The theme mode.
 * @returns The icon corresponding to the specified theme.
 */
export function themeIcon(themeMode: ThemeMode): string {
	switch (themeMode) {
		case ThemeMode.Dark: return "dark_mode";
		case ThemeMode.Light: return "light_mode";
		default: return "contrast";
	}
}

/**
 * Gets the label corresponding to the specified theme.
 * @param themeMode The theme mode.
 * @returns The label corresponding to the specified theme.
 */
export function themeLabel(themeMode: ThemeMode): string {
	switch (themeMode) {
		case ThemeMode.Dark: return "Sombre";
		case ThemeMode.Light: return "Clair";
		default: return "Auto";
	}
}
