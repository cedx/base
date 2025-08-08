import {AppTheme, getIcon} from "#Html/AppTheme.js";

/**
 * A dropdown menu for switching the application theme.
 */
export class ThemeDropdown extends HTMLElement {

	/**
	 * The media query used to check the application theme.
	 */
	readonly #mediaQuery = matchMedia("(prefers-color-scheme: dark)");

	/**
	 * The root element.
	 */
	readonly #root = this.shadowRoot!.querySelector("slot")!.assignedElements().at(0)!;

	/**
	 * The key of the storage entry providing the saved theme mode.
	 */
	readonly #storageKey = this.getAttribute("storageKey") ?? "AppTheme";

	/**
	 * The current application theme.
	 */
	#theme: AppTheme;

	/**
	 * Creates a new theme dropdown.
	 */
	constructor() {
		super();
		const theme = localStorage.getItem(this.#storageKey) as AppTheme;
		this.#theme = Object.values(AppTheme).includes(theme) ? theme : AppTheme.System;
		for (const button of this.#root.querySelectorAll("button")) button.addEventListener("click", this.#setTheme.bind(this));
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("theme-dropdown", this);
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		this.#mediaQuery.addEventListener("change", this);
		this.#applyTheme();
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		this.#mediaQuery.removeEventListener("change", this);
	}

	/**
	 * Handles the events.
	 */
	handleEvent(): void {
		this.#applyTheme();
	}

	/**
	 * Applies the theme to the document.
	 */
	#applyTheme(): void {
		const theme = this.#theme == AppTheme.System ? (this.#mediaQuery.matches ? AppTheme.Dark : AppTheme.Light) : this.#theme;
		document.documentElement.dataset.bsTheme = theme.toLowerCase();
		this.#root.querySelector(".dropdown-toggle > .icon")!.textContent = getIcon(this.#theme);

		const checkIcon = this.#root.querySelector(".dropdown-item > .icon")!;
		checkIcon.remove();
		const activeButton = this.#root.querySelector(`button[data-theme="${this.#theme}"]`)!
		activeButton.appendChild(checkIcon);
	}

	/**
	 * Changes the current theme.
	 * @param event The dispatched event.
	 */
	#setTheme(event: Event): void {
		const button = (event.target as HTMLElement).closest("button")!;
		localStorage.setItem(this.#storageKey, this.#theme = button.dataset.theme as AppTheme);
		this.#applyTheme();
	}
}

/**
 * Declaration merging.
 */
declare global {

	/**
	 * The map of HTML tag names.
	 */
	interface HTMLElementTagNameMap {
		"theme-dropdown": ThemeDropdown;
	}
}
