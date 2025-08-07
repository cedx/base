import {AppTheme, themeIcon, themeLabel} from "#Html/AppTheme.js";
import {MenuAlignment} from "#Html/MenuAlignment.js";
import {html, LitElement, type TemplateResult} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {classMap} from "lit/directives/class-map.js";
import {when} from "lit/directives/when.js";

/**
 * A dropdown menu for switching the color mode.
 */
@customElement("theme-dropdown")
export class ThemeDropdown extends LitElement {

	/**
	 * The alignment of the dropdown menu.
	 */
	@property() alignment: MenuAlignment = MenuAlignment.End;

	/**
	 * The label of the dropdown menu.
	 */
	@property() label = "";

	/**
	 * The key of the storage entry providing the saved theme.
	 */
	@property() storageKey = "AppTheme";

	/**
	 * The current application theme.
	 */
	@state() private appTheme: AppTheme;

	/**
	 * The media query used to check the system theme.
	 */
	readonly #mediaQuery = matchMedia("(prefers-color-scheme: dark)");

	/**
	 * Creates a new theme dropdown.
	 */
	constructor() {
		super();
		const theme = localStorage.getItem(this.storageKey) as AppTheme;
		this.appTheme = Object.values(AppTheme).includes(theme) ? theme : AppTheme.System;
	}

	/**
	 * The current theme mode.
	 */
	get theme(): AppTheme { return this.appTheme; }
	set theme(value: AppTheme) {
		localStorage.setItem(this.storageKey, this.appTheme = value);
		this.#applyTheme();
	}

	/**
	 * Method invoked when this component is connected.
	 */
	override connectedCallback(): void {
		super.connectedCallback();
		this.#applyTheme();
		this.#mediaQuery.addEventListener("change", this);
	}

	/**
	 * Method invoked when this component is disconnected.
	 */
	override disconnectedCallback(): void {
		this.#mediaQuery.removeEventListener("change", this);
		super.disconnectedCallback();
	}

	/**
	 * Handles the events.
	 */
	handleEvent(): void {
		this.#applyTheme();
	}

	/**
	 * Returns the node into which this component should render.
	 * @returns The node into which this component should render.
	 */
	protected override createRenderRoot(): DocumentFragment|HTMLElement {
		return this;
	}

	/**
	 * Renders this component.
	 * @returns The view template.
	 */
	protected override render(): TemplateResult {
		return html`
			<li class="nav-item dropdown">
				<a class="dropdown-toggle nav-link" data-bs-toggle="dropdown" href="#">
					<i class="icon icon-fill">${themeIcon(this.appTheme)}</i>
					${when(this.label, () => html`<span class="ms-1">${this.label}</span>`)}
				</a>
				<ul class="dropdown-menu ${classMap({"dropdown-menu-end": this.alignment == MenuAlignment.End})}">
					${Object.values(AppTheme).map(value => html`
						<li>
							<button class="dropdown-item d-flex align-items-center justify-content-between" @click=${() => this.theme = value}>
								<span><i class="icon icon-fill me-1">${themeIcon(value)}</i> ${themeLabel(value)}</span>
								${when(value == this.appTheme, () => html`<i class="icon ms-2">check</i>`)}
							</button>
						</li>
					`)}
				</ul>
			</li>
		`;
	}

	/**
	 * Applies the theme to the document.
	 */
	#applyTheme(): void {
		const theme = this.appTheme == AppTheme.System ? (this.#mediaQuery.matches ? AppTheme.Dark : AppTheme.Light) : this.appTheme;
		document.documentElement.dataset.bsTheme = theme.toLowerCase();
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
