import {Dropdown} from "bootstrap";
import {Alignment} from "../Alignment.js";
import {AppTheme, getIcon} from "../AppTheme.js";

/**
 * A dropdown menu for switching the application theme.
 */
export class ThemeDropdown extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["alignment", "apptheme", "label"];

	/**
	 * The dropdown menu.
	 */
	#dropdown!: Dropdown;

	/**
	 * The media query used to check the application theme.
	 */
	readonly #mediaQuery = matchMedia("(prefers-color-scheme: dark)");

	/**
	 * Creates a new theme dropdown.
	 */
	constructor() {
		super();
		for (const button of this.querySelectorAll(".dropdown-menu button")) button.addEventListener("click", this.#setAppTheme.bind(this));
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
	get alignment(): Alignment {
		const value = this.getAttribute("alignment") as Alignment;
		return Object.values(Alignment).includes(value) ? value : Alignment.End;
	}
	set alignment(value: Alignment) {
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
			case "alignment": this.#updateAlignment(Object.values(Alignment).includes(newValue as Alignment) ? newValue as Alignment : Alignment.End); break;
			case "apptheme": this.#updateAppTheme(Object.values(AppTheme).includes(newValue as AppTheme) ? newValue as AppTheme : AppTheme.System); break;
			case "label": this.#updateLabel(newValue ?? ""); break;
			// No default
		}
	}

	/**
	 * Closes the dropdown menu.
	 */
	close(): void {
		this.#dropdown.hide();
	}

	/**
	 * Method invoked when this component is connected.
	 */
	connectedCallback(): void {
		const appTheme = localStorage.getItem(this.storageKey) as AppTheme|null;
		if (appTheme) this.appTheme = appTheme;

		this.#dropdown = new Dropdown(this.querySelector(".dropdown-toggle")!);
		this.#mediaQuery.addEventListener("change", this.#applyToDocument);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		this.#dropdown.dispose();
		this.#mediaQuery.removeEventListener("change", this.#applyToDocument);
	}

	/**
	 * Opens the dropdown menu.
	 */
	open(): void {
		this.#dropdown.show();
	}

	/**
	 * Saves the current application theme into the local storage.
	 */
	save(): void {
		localStorage.setItem(this.storageKey, this.appTheme);
	}

	/**
	 * Applies the application theme to the document.
	 */
 	readonly #applyToDocument: () => void = () => {
		const {appTheme} = this;
		const bsTheme = appTheme == AppTheme.System ? (this.#mediaQuery.matches ? AppTheme.Dark : AppTheme.Light) : appTheme;
		document.documentElement.dataset.bsTheme = bsTheme.toLowerCase();
	};

	/**
	 * Changes the current application theme.
	 * @param event The dispatched event.
	 */
	#setAppTheme(event: Event): void {
		event.preventDefault();
		this.appTheme = (event.currentTarget as HTMLElement).dataset.theme! as AppTheme;
		this.save();
	}

	/**
	 * Updates the alignment of the dropdown menu.
	 * @param value The new value.
	 */
	#updateAlignment(value: Alignment): void {
		this.querySelector(".dropdown-menu")!.classList.toggle("dropdown-menu-end", value == Alignment.End);
	}

	/**
	 * Updates the application theme.
	 * @param value The new value.
	 */
	#updateAppTheme(value: AppTheme): void {
		this.querySelector(".dropdown-toggle > .icon")!.textContent = getIcon(value);
		this.querySelector(`button[data-theme="${value}"]`)!.appendChild(this.querySelector(".dropdown-item > .icon")!);
		this.#applyToDocument();
	}

	/**
	 * Updates the label of the dropdown menu.
	 * @param value The new value.
	 */
	#updateLabel(value: string): void {
		this.querySelector(".dropdown-toggle > span")!.textContent = value.trim() || "Thème";
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
