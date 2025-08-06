import type {LoadingIndicator} from "./LoadingIndicator.js";
import type {OfflineIndicator} from "./OfflineIndicator.js";
import type {ThemeDropdown} from "./ThemeDropdown.js";

/**
 * Declaration merging.
 */
declare global {

	/**
	 * The map of HTML tag names.
	 */
	interface HTMLElementTagNameMap {
		"loading-indicator": LoadingIndicator;
		"offline-indicator": OfflineIndicator;
		"theme-dropdown": ThemeDropdown;
	}
}
