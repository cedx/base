import {Dropdown} from "bootstrap";
import {Alignment} from "../Alignment.js";
import {AppTheme, icon} from "../AppTheme.js";

/**
 * A dropdown menu for switching the application theme.
 */
export class ThemeDropdown extends HTMLElement {

	/**
	 * The list of observed attributes.
	 */
	static readonly observedAttributes = ["alignment", "apptheme", "label"];

	/**
	 * The abort controller used to remove the event listeners.
	 */
	readonly #abortController = new AbortController;

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
		for (const button of this.querySelectorAll(".dropdown-menu button")) button.addEventListener("click", this.#setAppTheme);
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
	 * Value indicating whether to store the application theme in a cookie.
	 */
	get cookie(): boolean {
		return this.hasAttribute("cookie");
	}
	set cookie(value: boolean) {
		this.toggleAttribute("cookie", value);
	}

	/**
	 * The URI for which the associated cookie is valid.
	 */
	get cookieDomain(): string {
		return (this.getAttribute("cookiedomain") ?? "").trim();
	}
	set cookieDomain(value: string) {
		this.setAttribute("cookiedomain", value);
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
	 * @returns Completes when this component has been connected.
	 */
	async connectedCallback(): Promise<void> {
		this.#dropdown = new Dropdown(this.querySelector(".dropdown-toggle")!);
		this.#mediaQuery.addEventListener("change", this.#applyToDocument, {signal: this.#abortController.signal});

		const cookie = this.cookie ? await cookieStore.get(this.storageKey) : null;
		if (cookie) this.appTheme = cookie.value as AppTheme;
		else {
			const storage = localStorage.getItem(this.storageKey);
			if (storage) this.appTheme = storage as AppTheme;
		}
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	disconnectedCallback(): void {
		this.#abortController.abort();
		this.#dropdown.dispose();
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
		const {appTheme, cookieDomain} = this;
		localStorage.setItem(this.storageKey, appTheme);

		if (this.cookie) void cookieStore.set({
			domain: cookieDomain ? cookieDomain : null,
			expires: Date.now() + (365 * 24 * 60 * 60 * 1_000),
			name: this.storageKey,
			value: appTheme
		});
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
	readonly #setAppTheme: (event: Event) => void = event => {
		event.preventDefault();
		this.appTheme = (event.currentTarget as HTMLButtonElement).value as AppTheme;
		this.save();
	};

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
		this.querySelector(".dropdown-toggle > .icon")!.textContent = icon(value);
		this.querySelector(`.dropdown-menu button[value="${value}"]`)!.appendChild(this.querySelector(".dropdown-item > .icon")!);
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
