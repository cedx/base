import {AppTheme, getIcon} from "../AppTheme.js";
import {MenuAlignment} from "../MenuAlignment.js";

/**
 * A dropdown menu for switching the application theme.
 */
export class ThemeDropdown extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["alignment", "apptheme", "label"];

	/**
	 * The media query used to check the application theme.
	 */
	readonly #mediaQuery = matchMedia("(prefers-color-scheme: dark)");

	/**
	 * Creates a new theme dropdown.
	 */
	constructor() {
		super();
		for (const button of this.querySelectorAll("button")) button.addEventListener("click", this.#setTheme.bind(this));
	}

	/**
	 * Registers the component.
	 */
	static {
		customElements.define("theme-dropdown", this);
	}

	/**
	 * The alignment of the dropdown menu.
	 */
	get alignment(): MenuAlignment {
		const value = this.getAttribute("alignment") as MenuAlignment;
		return Object.values(MenuAlignment).includes(value) ? value : MenuAlignment.End;
	}
	set alignment(value: MenuAlignment) {
		this.setAttribute("alignment", value);
	}

	/**
	 * The current application theme.
	 */
	get appTheme(): AppTheme {
		const value = this.getAttribute("apptheme") as AppTheme;
		return Object.values(AppTheme).includes(value) ? value : AppTheme.System;
	}
	set appTheme(value: AppTheme) {
		this.setAttribute("apptheme", value);
		localStorage.setItem(this.storageKey, this.appTheme);
	}

	/**
	 * The label of the dropdown menu.
	 */
	get label(): string {
		const value = this.getAttribute("label") ?? "";
		return value.trim() || "Thème";
	}
	set label(value: string) {
		this.setAttribute("label", value);
	}

	/**
	 * The key of the storage entry providing the saved application theme.
	 */
	get storageKey(): string {
		const value = this.getAttribute("storagekey") ?? "";
		return value.trim() || "AppTheme";
	}
	set storageKey(value: string) {
		this.setAttribute("storagekey", value);
	}

	/**
	 * Method invoked when an attribute has been changed.
	 * @param attribute The attribute name.
	 * @param oldValue The previous attribute value.
	 * @param newValue The new attribute value.
	 */
	attributeChangedCallback(attribute: string, oldValue: string|null, newValue: string|null): void {
		if (newValue != oldValue) switch (attribute) {
			case "alignment": {
				const alignment = Object.values(MenuAlignment).includes(newValue as MenuAlignment) ? newValue as MenuAlignment : MenuAlignment.End;
				const {classList} = this.querySelector(".dropdown-menu")!;
				if (alignment == MenuAlignment.End) classList.add("dropdown-menu-end");
				else classList.remove("dropdown-menu-end");
				break;
			}
			case "apptheme": {
				const appTheme = Object.values(AppTheme).includes(newValue as AppTheme) ? newValue as AppTheme : AppTheme.System;
				this.querySelector(".dropdown-toggle > .icon")!.textContent = getIcon(appTheme);
				this.querySelector(`button[data-theme="${appTheme}"]`)!.appendChild(this.querySelector(".dropdown-item > .icon")!);
				this.#applyTheme();
				break;
			}
			case "label": {
				this.querySelector(".dropdown-toggle > span")!.textContent = (newValue ?? "").trim() || "Thème";
				break;
			}
			// No default
		}
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		this.#mediaQuery.addEventListener("change", this);
		const appTheme = localStorage.getItem(this.storageKey) as AppTheme|null;
		if (appTheme) this.setAttribute("apptheme", appTheme);
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
	 * Applies the application theme to the document.
	 */
	#applyTheme(): void {
		const {appTheme} = this;
		const bsTheme = appTheme == AppTheme.System ? (this.#mediaQuery.matches ? AppTheme.Dark : AppTheme.Light) : appTheme;
		document.documentElement.dataset.bsTheme = bsTheme.toLowerCase();
	}

	/**
	 * Changes the current application theme.
	 * @param event The dispatched event.
	 */
	#setTheme(event: Event): void {
		event.preventDefault();
		const button = (event.target as HTMLElement).closest("button")!;
		this.appTheme = button.dataset.theme! as AppTheme;
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
