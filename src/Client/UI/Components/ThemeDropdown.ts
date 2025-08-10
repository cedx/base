import {AppTheme, getIcon} from "../AppTheme.js";
import {MenuAlignment} from "../MenuAlignment.js";

/**
 * A dropdown menu for switching the application theme.
 */
export class ThemeDropdown extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["alignment", "appTheme", "label", "storageKey"];

	/**
	 * The alignment of the dropdown menu.
	 */
	#alignment: MenuAlignment = MenuAlignment.End;

	/**
	 * The current application theme.
	 */
	#appTheme: AppTheme = AppTheme.System;

	/**
	 * The label of the dropdown menu.
	 */
	#label = "Thème";

	/**
	 * The media query used to check the application theme.
	 */
	readonly #mediaQuery = matchMedia("(prefers-color-scheme: dark)");

	/**
	 * The key of the storage entry providing the saved application theme.
	 */
	#storageKey = "AppTheme";

	/**
	 * Creates a new theme dropdown.
	 */
	constructor() {
		super();
		// TODO const appTheme = localStorage.getItem(this.storageKey) as AppTheme|null;
		// this.#appTheme = appTheme ??
		// if (appTheme) this.#appTheme = appTheme;
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
		return this.#alignment;
	}
	set alignment(value: MenuAlignment) {
		console.log("SET alignment", value); // TODO remove debug statement
		this.#alignment = Object.values(MenuAlignment).includes(value) ? value : MenuAlignment.End;
		const {classList} = this.querySelector(".dropdown-menu")!;
		if (this.#alignment == MenuAlignment.End) classList.add("dropdown-menu-end");
		else classList.remove("dropdown-menu-end");
	}

	/**
	 * The current application theme.
	 */
	get appTheme(): AppTheme {
		return this.#appTheme;
	}
	set appTheme(value: AppTheme) {
		console.log("SET appTheme", value); // TODO remove debug statement
		this.#appTheme = Object.values(AppTheme).includes(value) ? value : AppTheme.System;
		localStorage.setItem(this.storageKey, this.#appTheme);
		this.#applyTheme();
	}

	/**
	 * The label of the dropdown menu.
	 */
	get label(): string {
		return this.#label;
	}
	set label(value: string) {
		console.log("SET label", value); // TODO remove debug statement
		this.#label = value.trim();
		const span = this.querySelector<HTMLSpanElement>(".dropdown-toggle > span")!;
		span.hidden = Boolean(this.#label);
		span.textContent = this.#label;
	}

	/**
	 * The key of the storage entry providing the saved application theme.
	 */
	get storageKey(): string {
		return this.#storageKey;
	}
	set storageKey(value: string) {
		console.log("SET storageKey", value); // TODO remove debug statement
		this.#storageKey = value ? value : "AppTheme";
	}

	/**
	 * Method invoked when an attribute has been changed.
	 * @param attribute The attribute name.
	 * @param oldValue The previous attribute value.
	 * @param newValue The new attribute value.
	 */
	attributeChangedCallback(attribute: string, oldValue: string|null, newValue: string|null): void {
		console.log("CALL attributeChangedCallback", attribute, oldValue, newValue, this.isConnected); // TODO remove debug statement
		if (oldValue !== newValue) switch (attribute) {
			case "alignment": this.alignment = newValue as MenuAlignment|null ?? MenuAlignment.End; break;
			case "apptheme": this.appTheme = newValue as AppTheme|null ?? AppTheme.System; break;
			case "label": this.label = newValue ?? "Thème"; break;
			case "storagekey": this.storageKey = newValue ?? "AppTheme"; break;
		}
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
	 * Applies the current theme to the document.
	 */
	#applyTheme(): void {
		const {appTheme} = this;
		this.querySelector(".dropdown-toggle > .icon")!.textContent = getIcon(appTheme);
		this.querySelector(`button[data-theme="${appTheme}"]`)!.appendChild(this.querySelector(".dropdown-item > .icon")!);

		const bsTheme = appTheme == AppTheme.System ? (this.#mediaQuery.matches ? AppTheme.Dark : AppTheme.Light) : appTheme;
		document.documentElement.dataset.bsTheme = bsTheme.toLowerCase();
	}

	/**
	 * Changes the current theme.
	 * @param event The dispatched event.
	 */
	#setTheme(event: Event): void {
		event.preventDefault();
		const button = (event.target as HTMLElement).closest("button")!;
		this.setAttribute("appTheme", button.dataset.theme!);
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
